import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  txtUserName: any;
  txtUserEmail: any;
  txtPassword: any;
  txtUserType: any;
  selectItem: any;
  isLoaderShow = false;
  admin_id: any;
  Dashboard: any;
  Team: any;
  Player: any;
  Matches: any;
  ScoreBoard: any;
  Push: any;
  Points: any;
  Sponsor: any;

  testList: any = [
    {CID: 1, CName: 'Dashboard', checked: false},
    {CID: 2, CName: 'Team', checked: false},
    {CID: 3, CName: 'Player', checked: false},
    {CID: 4, CName: 'Matches', checked: false},
    {CID: 4, CName: 'ScoreBoard', checked: false},
    {CID: 4, CName: 'Push', checked: false},
    {CID: 4, CName: 'Points', checked: false},
    {CID: 4, CName: 'Sponsor', checked: false}
 ];

selectedArray: any[] = [];
  nameper!: string;
  nameper1: any;
  namelist = this.testList;

  constructor( public router: Router, private serviceService: ApiservicesService, public route: ActivatedRoute ) { }

  ngOnInit() {
    this.admin_id = this.route.snapshot.params['admin_id'];
    if (this.admin_id !== undefined) {
      this.getUserById();
    }
  }
  getUserById() {
    this.isLoaderShow = true;
    this.serviceService.getUserById(this.admin_id)
    .subscribe(
      (data:any) => {
        console.log(data);
        console.log(data.data[0]['admin_username']);
        this.isLoaderShow = false;
        this.txtUserName = data.data[0]['admin_username'];
        this.txtUserEmail = data.data[0]['admin_email'];
        this.txtPassword = data.data[0]['admin_pass'];
        this.txtUserType = data.data[0]['admin_type'];
        this.nameper1 = data.data[0]['menus'];
        this.nameper1 = this.nameper1.split(',');
          for (const item of this.nameper1) {
            this.selectedArray.push(item);
            for (const i in this.namelist) {
              if (this.namelist[i].CName === item) {
                this.namelist[i].isSelected = true;
                break;
              }
            }
          }
          for (let i = 0; i < this.selectedArray.length; i++) {
            if (i + 1 === this.selectedArray.length) {
              this.nameper1 += '' + this.selectedArray[i] + '';
            } else {
              this.nameper1 += '' + this.selectedArray[i] + ',';
            }
          }
      });
  }

  selectMember(event:any) {
    this.nameper = '';
    if (event.checked) {
      this.selectedArray.push(event.source.value);
    } else {
      const index: number = this.selectedArray.indexOf(event.source.value);
      if (index !== -1) {
        this.selectedArray.splice(index, 1);
      }
    }
    for (let i = 0; i < this.selectedArray.length; i++) {
      if (i + 1 === this.selectedArray.length) {
        this.nameper  += '' + this.selectedArray[i] + '';
      } else {
        this.nameper  += '' + this.selectedArray[i] + ',';
      }
    }
}

  save() {
    let UserIdArray = {};
    if (this.admin_id !== undefined) {
      UserIdArray = {
        admin_id: this.admin_id
      };
    }
    const UsersArray = {
      series: window.localStorage.getItem('selectedSeries'),
      admin_username: this.txtUserName,
      admin_email: this.txtUserEmail,
      admin_pass: this.txtPassword,
      admin_type: this.txtUserType,
      menus: this.nameper,
      ...UserIdArray
    };
    if (this.txtUserName === '' || this.txtUserName == null || this.txtUserName === undefined) {
      this.serviceService.openSnackBar('Please Enter User Name', 'Close');
    } else if (this.txtUserEmail === '' || this.txtUserEmail == null || this.txtUserEmail === undefined) {
      this.serviceService.openSnackBar('Please Enter User Email', 'Close');
    } else if (this.txtPassword === '' || this.txtPassword == null || this.txtPassword === undefined) {
      this.serviceService.openSnackBar('Please Enter PassWord', 'Close');
    } else if (this.txtUserType === '' || this.txtUserType == null || this.txtUserType === undefined) {
      this.serviceService.openSnackBar('please Select User Type', 'Close');
    }  else {
    this.isLoaderShow = true;
    if (this.admin_id !== undefined) {
      this.serviceService.updateUser(UsersArray).subscribe(
        (data:any) => {
          this.serviceService.openSnackBar('User Updated Successfully', 'Close');
          this.router.navigate(['/users']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update User', 'Close');
        });
    } else {
    this.serviceService.addUser(UsersArray)
    .subscribe( (data:any) => {
      this.serviceService.openSnackBar('User Added Successfully', 'Close');
      this.router.navigate(['/users']);
    },
    (error:any) => {
      this.isLoaderShow = false;
      this.serviceService.openSnackBar('Some Error During Add User', 'Close');
    });
  }
}
}
  back() {
    this.router.navigate(['/users']);
  }
}
