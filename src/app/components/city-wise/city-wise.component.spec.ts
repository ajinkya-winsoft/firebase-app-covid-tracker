import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWiseComponent } from './city-wise.component';

describe('CityWiseComponent', () => {
  let component: CityWiseComponent;
  let fixture: ComponentFixture<CityWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
