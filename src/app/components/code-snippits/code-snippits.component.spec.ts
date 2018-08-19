import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippitsComponent } from './code-snippits.component';

describe('CodeSnippitsComponent', () => {
  let component: CodeSnippitsComponent;
  let fixture: ComponentFixture<CodeSnippitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSnippitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSnippitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
