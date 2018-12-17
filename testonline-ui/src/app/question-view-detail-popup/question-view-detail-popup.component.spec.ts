import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewDetailPopupComponent } from './question-view-detail-popup.component';

describe('QuestionViewDetailPopupComponent', () => {
  let component: QuestionViewDetailPopupComponent;
  let fixture: ComponentFixture<QuestionViewDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionViewDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
