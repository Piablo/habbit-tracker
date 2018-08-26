import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleReadingComponent } from './bible-reading.component';

describe('BibleReadingComponent', () => {
  let component: BibleReadingComponent;
  let fixture: ComponentFixture<BibleReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
