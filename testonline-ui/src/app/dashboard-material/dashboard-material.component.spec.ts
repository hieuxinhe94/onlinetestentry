
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaterialComponent } from './dashboard-material.component';

describe('DashboardMaterialComponent', () => {
  let component: DashboardMaterialComponent;
  let fixture: ComponentFixture<DashboardMaterialComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
