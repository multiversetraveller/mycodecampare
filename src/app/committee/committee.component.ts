import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  no: number;
  name: string;
  dob: string;
  age: number;
  mobile: number;
  image: string;
  action: number;
}

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.css']
})
export class CommitteeComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'dob', 'age', 'mobile', 'image', 'action'];
  dataSource: MatTableDataSource<UserData>;
  committeeList: UserData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoaderShow = false;
  getcommittee: any[] = [];
  committee: any;
value: any;
  constructor(
    public router: Router, public serviceService: ApiservicesService
  ) {
    this.dataSource = new MatTableDataSource(this.committeeList);
   }

  ngOnInit() {
    this.getAllCommitte();
  }

  getAllCommitte() {
    this.committeeList = [];
    this.getcommittee = [];
    this.isLoaderShow = true;
    this.serviceService.getAllCommitte()
    .subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.getcommittee.push(data);
        this.committee = this.getcommittee[0].data;
        let i = 1;
        for (const item of this.committee) {
          this.committeeList.push({
            no: i++,
            name: item.name,
            dob: item.dob,
            age: item.age,
            mobile: item.mobile,
            image: item.img,
            action: item.com_mem_id
          });
        }
          this.dataSource = new MatTableDataSource<UserData>(this.committeeList);
          this.dataSource.paginator = this.paginator;
        },
      (        error: any) => {
          this.isLoaderShow = false;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  committeeAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addcommittee']);
  }
  editCmem(id: any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/addcommittee', {'com_mem_Id': id}], {skipLocationChange: true});
  }
  deleteCommitie(id: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Committee Member');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteCommitte(id).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Committee Member Delete Successfully', 'Close');
          this.getAllCommitte();
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Committee Member Delete Failed', 'Close');
        });
    }
}

clearsearch(){
  this.value = '';
  this.dataSource.filter ='';
}

}
