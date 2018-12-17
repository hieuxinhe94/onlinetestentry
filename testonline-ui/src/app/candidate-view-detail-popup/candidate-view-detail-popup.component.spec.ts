import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateViewDetailPopupComponent } from './candidate-view-detail-popup.component';

describe('CandidateViewDetailPopupComponent', () => {
  let component: CandidateViewDetailPopupComponent;
  let fixture: ComponentFixture<CandidateViewDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateViewDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateViewDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
