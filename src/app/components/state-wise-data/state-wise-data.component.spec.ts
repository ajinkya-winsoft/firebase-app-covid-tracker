import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseDataComponent } from './state-wise-data.component';

describe('StateWiseDataComponent', () => {
  let component: StateWiseDataComponent;
  let fixture: ComponentFixture<StateWiseDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateWiseDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateWiseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
