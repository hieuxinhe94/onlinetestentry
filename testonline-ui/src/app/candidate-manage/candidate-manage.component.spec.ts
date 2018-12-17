import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateManageComponent } from './candidate-manage.component';

describe('CandidateManageComponent', () => {
  let component: CandidateManageComponent;
  let fixture: ComponentFixture<CandidateManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
