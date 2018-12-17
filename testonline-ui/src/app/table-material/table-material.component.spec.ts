
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMaterialComponent } from './table-material.component';

describe('TableMaterialComponent', () => {
  let component: TableMaterialComponent;
  let fixture: ComponentFixture<TableMaterialComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
