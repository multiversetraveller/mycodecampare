import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  no: number;
  groupname: string;
  subgroupname: string;
  groupteam: string;
  createddate: string;
  action: number;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'groupname', 'subgroupname', 'groupteam', 'createddate', 'action'];
  dataSource: MatTableDataSource<UserData>;
  groups: UserData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getgroup: any[] = [];
  group: any;
  isLoaderShow = false;
value: any;
  constructor(
    public router: Router, private  serviceService: ApiservicesService
  ) {
    this.dataSource = new MatTableDataSource(this.groups);
   }

  ngOnInit() {
    this.getAllGroup();
  }

  getAllGroup() {
    this.groups = [];
    this.getgroup = [];
    this.isLoaderShow = true;
    this.serviceService.getAllGroup()
    .subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.getgroup.push(data);
        this.group = this.getgroup[0].data;
        let i = 1;
        for (const item of this.group) {
          this.groups.push({
            no: i++,
            groupname: item.gp_name,
            subgroupname: item.group_name,
            groupteam: item.group_team,
            createddate: item.created_date,
            action: item.group_id
          });
        }
          this.dataSource = new MatTableDataSource<UserData>(this.groups);
          this.dataSource.paginator = this.paginator;
        },
        (error:any) => {
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

  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
  editGroups(id:any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/addgroup', {'groupId': id}], {skipLocationChange: true});
  }

  groupAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addgroup']);
  }
  deleteGroup(id:any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Group');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteGroup(id).subscribe(
        (data:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Group Delete Successfully', 'Close');
          this.getAllGroup();
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Group Delete Failed', 'Close');
        });
    }
}

}
