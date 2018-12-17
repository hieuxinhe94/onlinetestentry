import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewCandidatePopupComponent } from './admin-new-candidate-popup.component';

describe('AdminNewCandidatePopupComponent', () => {
  let component: AdminNewCandidatePopupComponent;
  let fixture: ComponentFixture<AdminNewCandidatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewCandidatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewCandidatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
