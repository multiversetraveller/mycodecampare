import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  teams: any;
  isLoaderShow = false;
  txtGroupName = '';
  txtSubGroupName = '';
  txtteamName = '';
  teamNameID = '';
  groupId: any;
  constructor(
    private serviceService: ApiservicesService, public router: Router, public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupId'];
    this.getTeamdetail();
    this.getPointsById();
  }
  getPointsById() {
    this.isLoaderShow = true;
    this.serviceService.getPointsById(this.groupId)
    .subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.txtGroupName = data['gp_name'];
        this.txtteamName = data['team_id'];
        this.txtSubGroupName = data['group_name'];
      });
  }

  getTeamdetail() {
    this.isLoaderShow = true;
    this.serviceService.getTeamdetail().subscribe(
      (        data: { [x: string]: any; }) => {
          this.isLoaderShow = false;
          this.teams = data['data'];
        },
      (        error: any) => {
          this.isLoaderShow = false;
        });
  }


  save() {
    const teamname = this.txtteamName;
    // tslint:disable-next-line: triple-equals
    const index =  _.findIndex(this.teams, function(o:any) {return o.team_id == teamname; });
    this.teamNameID =  this.teams[index].team_name ;

    let groupIdArray = {};
    if (this.groupId !== undefined) {
      groupIdArray = {
        group_id: this.groupId
      };
    }
   const groupArray = {
     series: window.localStorage.getItem('selectedSeries'),
     gp_name: this.txtGroupName,
     group_name: this.txtSubGroupName,
     group_team: this.teamNameID,
     team_id: this.txtteamName,
     ...groupIdArray
     };
     if (this.txtGroupName === '' || this.txtGroupName == null || this.txtGroupName === undefined) {
      this.serviceService.openSnackBar('Please Enter GroupName', 'Close');
    } else if (this.txtSubGroupName === '' || this.txtSubGroupName == null || this.txtSubGroupName === undefined) {
      this.serviceService.openSnackBar('Please Enter SubGroupName', 'Close');
    } else if (this.teamNameID === '' || this.teamNameID == null || this.teamNameID === undefined) {
      this.serviceService.openSnackBar('Please Select TeamName', 'Close');
    } else {
     this.isLoaderShow = true;
    if (this.groupId !== undefined) {
      this.serviceService.updateGroup(groupArray).subscribe(
        (data:any) => {
          this.serviceService.openSnackBar('Group Updated Successfully', 'Close');
          this.router.navigate(['/groups']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Group', 'Close');
        });
    } else {
     this.serviceService.addGroup(groupArray)
    .subscribe( (data:any) => {
      this.serviceService.openSnackBar('Group Added Successfully', 'Close');
      this.router.navigate(['/groups']);
    },
    (error:any) => {
      this.isLoaderShow = false;
      this.serviceService.openSnackBar('Some Error During Add Group', 'Close');
    });
  }
}
  }
  back() {
    this.router.navigate(['/groups']);
  }

}

