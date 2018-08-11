import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHistoryComponent } from './fitness-history.component';

describe('FitnessHistoryComponent', () => {
  let component: FitnessHistoryComponent;
  let fixture: ComponentFixture<FitnessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
