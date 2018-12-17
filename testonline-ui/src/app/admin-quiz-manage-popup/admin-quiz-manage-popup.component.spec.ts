import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizManagePopupComponent } from './admin-quiz-manage-popup.component';

describe('AdminQuizManagePopupComponent', () => {
  let component: AdminQuizManagePopupComponent;
  let fixture: ComponentFixture<AdminQuizManagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizManagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizManagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
