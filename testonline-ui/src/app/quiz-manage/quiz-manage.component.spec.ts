import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizManageComponent } from './quiz-manage.component';

describe('QuizManageComponent', () => {
  let component: QuizManageComponent;
  let fixture: ComponentFixture<QuizManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
