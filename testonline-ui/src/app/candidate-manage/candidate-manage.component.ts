import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
 import { AdminQuizManagePopupComponent } from '../admin-quiz-manage-popup/admin-quiz-manage-popup.component';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from '../model/candidate';
import { AdminNewCandidatePopupComponent } from '../admin-new-candidate-popup/admin-new-candidate-popup.component';
import { CandidateViewDetailPopupComponent } from '../candidate-view-detail-popup/candidate-view-detail-popup.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'itsol-candidate-manage',
  templateUrl: './candidate-manage.component.html',
  styleUrls: ['./candidate-manage.component.scss']
})
export class CandidateManageComponent implements OnInit {
  isShowAddNewButton = true;
  isShowDeleteButton = false;
  isReadly = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    dataSource = null;
    displayedColumns: string[] ;
    selection: any;
  constructor( public dialog: MatDialog,
    private _service: NotificationsService,
      public candidateService: CandidateService
    ) { }

  async ngOnInit() {
    this.init();
  }

  init() {
    (this.candidateService.getData()).subscribe(async (res) => {
      let t = 1;
      for ( let i = 0; i < res.length; i++ ) {
        res[i].index = t;
        t ++ ;
      }

      this.dataSource  = await new MatTableDataSource(res);
      // if (this.dataSource.length !== undefined && this.dataSource.length !== 0) {
        this.displayedColumns = ['index', 'userName', 'password', 'fullName', 'phone', 'address'];
        this.selection =  new SelectionModel<Candidate>(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isReadly = true;
      // }
    }, (e) => {
        console.log(e);
        this._service.error('Cannot load the list candidate. ', e.Message , {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
    });
  }

  register() {
    this.openDialogToAddNew();
  }
  onDelete(id) {

  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
      /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public toggle(data: any) {
    console.log(data);
    this.openDialogToViewDetail(data, 'view');
  }

  openDialogToViewDetail(data: any, action: string): void {
    const dialogRef = this.dialog.open(CandidateViewDetailPopupComponent, {
      width: 'auto',
      data: {data : data, action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed :' + result);
      if (result === 1) {
        this.init();
      }
    });
  }

  openDialogToAddNew(): void {
    const dialogRef = this.dialog.open(AdminNewCandidatePopupComponent, {
      width: 'auto',
      data: null
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed : ' + result);

        if (result === 1) {
          this.init();
        } else {
          this._service.warn('Unknows server response, pls check the result. ', {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true
          });
        }
    });
  }
}
