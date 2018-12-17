import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuizSubjectDialogComponent } from './new-quiz-subject-dialog.component';

describe('NewQuizSubjectDialogComponent', () => {
  let component: NewQuizSubjectDialogComponent;
  let fixture: ComponentFixture<NewQuizSubjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuizSubjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuizSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
