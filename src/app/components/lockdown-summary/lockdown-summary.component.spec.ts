import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockdownSummaryComponent } from './lockdown-summary.component';

describe('LockdownSummaryComponent', () => {
  let component: LockdownSummaryComponent;
  let fixture: ComponentFixture<LockdownSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockdownSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockdownSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
