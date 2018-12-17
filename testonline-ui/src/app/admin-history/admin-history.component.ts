import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface TableCandidateItem2 {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'itsol-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {

  EXAMPLE_DATA: TableCandidateItem2[] = [
    {id: 1, name: 'Candidate 1', weight: 1.0079, symbol: 'H'},
    {id: 2, name: 'Candidate 2', weight: 4.0026, symbol: 'He'},
    {id: 3, name: 'Candidate 3', weight: 6.941, symbol: 'Li'},
    {id: 4, name: 'Candidate 4', weight: 9.0122, symbol: 'Be'},
    {id: 5, name: 'Candidate 5', weight: 10.811, symbol: 'B'},
    {id: 6, name: 'Candidate 6', weight: 12.0107, symbol: 'C'},
    {id: 7, name: 'Candidate 7', weight: 14.0067, symbol: 'N'},
    {id: 8, name: 'Candidate 8', weight: 15.9994, symbol: 'O'},
    {id: 9, name: 'Candidate 9', weight: 18.9984, symbol: 'F'},
    {id: 10, name: 'Candidate 10', weight: 20.1797, symbol: 'Ne'},
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    dataSource = new MatTableDataSource(this.EXAMPLE_DATA);
    displayedColumns: string[] = ['select', 'id', 'name', 'weight', 'symbol'];
    selection = new SelectionModel<TableCandidateItem2>(true, []);
    currentSelected: TableCandidateItem2;


  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
