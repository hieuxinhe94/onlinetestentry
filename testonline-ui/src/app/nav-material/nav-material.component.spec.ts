
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavMaterialComponent } from './nav-material.component';

describe('NavMaterialComponent', () => {
  let component: NavMaterialComponent;
  let fixture: ComponentFixture<NavMaterialComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [NavMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
