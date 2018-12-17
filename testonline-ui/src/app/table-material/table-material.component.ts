import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableMaterialDataSource } from './table-material-datasource';

@Component({
  selector: 'itsol-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css']
})
export class TableMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableMaterialDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableMaterialDataSource(this.paginator, this.sort);
  }
}
