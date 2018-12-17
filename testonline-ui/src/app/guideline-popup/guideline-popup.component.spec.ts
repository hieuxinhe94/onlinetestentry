import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinePopupComponent } from './guideline-popup.component';

describe('GuidelinePopupComponent', () => {
  let component: GuidelinePopupComponent;
  let fixture: ComponentFixture<GuidelinePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelinePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
