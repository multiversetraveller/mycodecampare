import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from '../apiservices.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

export interface UserData {
  no: number;
  usertype: string;
  name: string;
  email: string;
  action: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['no', 'usertype', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<UserData>;
  userList:any = [];
  getusers: any[] = [];
  isLoaderShow = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user: any;
value: any;
  constructor(
    public router: Router, private serviceService: ApiservicesService
  ) {
    this.dataSource = new MatTableDataSource(this.userList);
   }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userList = [];
    this.getusers = [];
    this.isLoaderShow = true;
    this.serviceService.getAllUsers()
        .subscribe(
          ( data: any) => {
            this.isLoaderShow = false;
              this.getusers.push(data);
              this.user = this.getusers[0].data;
              let i = 1;
              for (const item of this.user) {
                  this.userList.push({
                    no: i++,
                    usertype: item.admin_type,
                    name: item.admin_username,
                    email: item.admin_email,
                    action: item.admin_id
                  });
              }
              this.dataSource = new MatTableDataSource<UserData>(this.userList);
                  this.dataSource.paginator = this.paginator;
          },
          (          error: any) => {
            this.isLoaderShow = false;
          });
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/adduser']);
  }
  edit(admin_id: any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/adduser', {'admin_id': admin_id }], {skipLocationChange: true});
  }
  delete(id: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This User');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteUser(id).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('User Delete Successfully', 'Close');
          this.getAllUsers();
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('User Delete Failed', 'Close');
        });
    }
}

}

