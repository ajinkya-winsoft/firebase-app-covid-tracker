import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { CovidService } from "../../common/services/covid.service";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  constructor(private covidService: CovidService) {

 }

  public treeData = {
    "name": "Top Level",
    "children": [
      {
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
  };
  public finalTree: any;
  public selectedValue: number;
  public patients: any;


  onChnage(id) {
       this.treeData = this.finalTree[id];
        d3.select("#tree").select("svg").remove();
       this.draw();

  }
    ngOnInit(): void {
         // this.processTreeAndCreateJson();
        this.getProcessedTree();

}
    getProcessedTree() {
        const tree = {};
        this.covidService.getProcessedTree()
            .subscribe(data => {
                this.patients = Object.keys(data);
                this.finalTree = data;
                this.treeData =data[this.patients[0]];
                this.draw();
            })
    }

    processTreeAndCreateJson() {
        const tree = {};
        this.covidService.getTree()
       .subscribe(res => {
           const data = res[0].raw_data.concat(res[1].raw_data);
           const rawData = data;
           rawData.forEach(d => {
               this.update(tree, d);
           });

           const f = {};
            for (let t of Object.keys(tree)) {
                if (tree[t]["children"] && tree[t]["children"].length > 0) {
                    f[t] = tree[t];
                }
            }
            this.patients = Object.keys(f);
            this.finalTree = f;

            // console.log(f);
            console.log(Object.keys(f));

            // On console execute save this as Global object, then JSON.stringify() and then copy.
            this.treeData =f[78];
            this.draw();
       });
    }

draw() {
    // console.log(this.treeData.children.length);
    let len = this.treeData.children.length;

    if (len<10) {
        len = 10;
    }

    const h = len * 50;
    const margin = {top: 20, right: 90, bottom: 30, left: 290};
    const width = 960 - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3.select("#tree").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let i = 0;
    const duration = 750;
    let root = null;

    const treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(this.treeData, function(d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    root.children.forEach(collapse);

    update(root);

    // Collapse the node and all it's children
    function  collapse(d) {
        if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }

    function update(source) {

// Assigns the x and y position for the nodes
var treeData = treemap(root);

// Compute the new tree layout.
var nodes = treeData.descendants(),
  links = treeData.descendants().slice(1);

// Normalize for fixed-depth.
nodes.forEach(function(d){ d.y = d.depth * 180});

// ****************** Nodes section ***************************

// Update the nodes...
var node = svg.selectAll('g.node')
  .data(nodes, function(d) {return d.id || (d.id = ++i); });

// Enter any new modes at the parent's previous position.
var nodeEnter = node.enter().append('g')
  .attr('class', 'node')
  .attr("transform", function(d) {
    return "translate(" + source.y0 + "," + source.x0 + ")";
})
.on('click', click);

// Add Circle for the nodes
nodeEnter.append('circle')
  .attr('class', 'node')
  .attr('r', 1e-6)
  .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
  });

// Add labels for the nodes
nodeEnter.append('text')
  .attr("dy", ".35em")
  .attr("x", function(d) {
      return d.children || d._children ? -13 : 13;
  })
  .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
  })
  .text(function(d) { return "P"+d.data.name + ", " + d.data.notes; });

// UPDATE
var nodeUpdate = nodeEnter.merge(node);

// Transition to the proper position for the node
nodeUpdate.transition()
.duration(duration)
.attr("transform", function(d) {
    return "translate(" + d.y + "," + d.x + ")";
 });

// Update the node attributes and style
nodeUpdate.select('circle.node')
.attr('r', 10)
.style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
})
.attr('cursor', 'pointer');


// Remove any exiting nodes
var nodeExit = node.exit().transition()
  .duration(duration)
  .attr("transform", function(d) {
      return "translate(" + source.y + "," + source.x + ")";
  })
  .remove();

// On exit reduce the node circles size to 0
nodeExit.select('circle')
.attr('r', 1e-6);

// On exit reduce the opacity of text labels
nodeExit.select('text')
.style('fill-opacity', 1e-6);

// ****************** links section ***************************

// Update the links...
var link = svg.selectAll('path.link')
  .data(links, function(d) { return d.id; });

// Enter any new links at the parent's previous position.
var linkEnter = link.enter().insert('path', "g")
  .attr("class", "link")
  .attr('d', function(d){
    var o = {x: source.x0, y: source.y0}
    return diagonal(o, o)
  });

// UPDATE
var linkUpdate = linkEnter.merge(link);

// Transition back to the parent element position
linkUpdate.transition()
  .duration(duration)
  .attr('d', function(d){ return diagonal(d, d.parent) });

// Remove any exiting links
var linkExit = link.exit().transition()
  .duration(duration)
  .attr('d', function(d) {
    var o = {x: source.x, y: source.y}
    return diagonal(o, o)
  })
  .remove();

// Store the old positions for transition.
nodes.forEach(function(d){
d.x0 = d.x;
d.y0 = d.y;
});

function diagonal(s, d) {

let path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`

return path
}


// Toggle children on click.
function click(d) {


if (d.children) {

    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
update(d);
}
}
}

getPatientNumber(str) {
    return str.substring(1, str.length);
}

update(tree, p) {
    if (p.contractedfromwhichpatientsuspected === "") {
        tree[p.patientnumber] = {name: p.patientnumber, parent: null, ...p};
        return;
    }

    for (let t of Object.keys(tree)) {
        const gotCovidFrom  = this.getPatientNumber(p.contractedfromwhichpatientsuspected);
        const d  = tree[t];
        // console.log(d, tree[d]);

        if (d.name === gotCovidFrom) {
            if(d.children) {
                d.children.push({name: p.patientnumber, parent: gotCovidFrom, ...p})
            } else {
                d["children"] = [];
                d.children.push({name: p.patientnumber, parent: gotCovidFrom, ...p});
            }
        } else {
            if(d.children && d.children.length>0) {
                const child = d.children;
                child.forEach(c => {
                    if (c.name === gotCovidFrom) {
                        if (c.children) {
                            c.children.push({name: p.patientnumber, parent: gotCovidFrom, ...p})
                        } else {
                            c["children"] = [];
                            c.children.push({name: p.patientnumber, parent: gotCovidFrom, ...p})
                        }

                    }
                    //  else {
                    //     c["children"] = [];
                    //     c.children.push({name: p.patientnumber, parent: gotCovidFrom, ...p})
                    // }
                })
            }
        }
    }
}

}
