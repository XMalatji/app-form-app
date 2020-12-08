import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { RegFormService } from '../reg-form/reg-form.service';

export interface PeepDto {
  name: string;
  surname: string;
  email: string;
  idNo: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  people = new BehaviorSubject([]);
  _displayedColumns: string[] = ['name', 'surname', 'idNo', 'email'];
  _dataSource = new MatTableDataSource<PeepDto>(this.people.getValue());


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this._dataSource.paginator = this.paginator;

  }

  constructor( private regService: RegFormService) { }

  ngOnInit(): void {

    this.regService.getPeeps().subscribe(people => {
      this.people.next(people);
    });

    if(this.people.getValue().length > 0) {
      this._dataSource = new MatTableDataSource<PeepDto>(this.people.getValue());
    }

  }

}
