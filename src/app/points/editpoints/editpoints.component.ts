import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-editpoints',
  templateUrl: './editpoints.component.html',
  styleUrls: ['./editpoints.component.css']
})
export class EditpointsComponent implements OnInit {
  groupId: any;
  txtGroupName = '';
  txtTeamName = '';
  txtTotalMatches = '';
  txtWin = '';
  txtLoss = '';
  txtPoints = '';
  txtAverage = '';
  isLoaderShow = false;

  constructor(
    public router: Router, private serviceService: ApiservicesService, public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupId'];
    this.getPointsById();
  }

  getPointsById() {
    this.isLoaderShow = true;
    this.serviceService.getPointsById(this.groupId)
    .subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.txtGroupName = data['group_name'];
        this.txtTeamName = data['group_team'];
        this.txtTotalMatches = data['total_matches'];
        this.txtWin = data['win'];
        this.txtLoss = data['loss'];
        this.txtPoints = data['points'];
        this.txtAverage = data['avg'];
      });
  }

  save($event:any) {

    const pointArray = {
      series: window.localStorage.getItem('selectedSeries'),
      group_id: this.groupId,
      group_name: this.txtGroupName,
      group_team: this.txtTeamName,
      total_matches: this.txtTotalMatches,
      win: this.txtWin,
      loss: this.txtLoss,
      points: this.txtPoints,
      avg: this.txtAverage
    };

    this.isLoaderShow = true;
    if (this.groupId !== undefined) {
      this.serviceService.updatePoints(pointArray).subscribe(
        (data:any) => {
          this.serviceService.openSnackBar('Points Updated Successfully', 'Close');
          this.router.navigate(['/points']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Points', 'Close');
        });
    }
  }

  back() {
    this.router.navigate(['/points']);
  }

}
