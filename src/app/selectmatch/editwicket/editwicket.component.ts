import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-editwicket',
  templateUrl: './editwicket.component.html',
  styleUrls: ['./editwicket.component.css']
})
export class EditwicketComponent implements OnInit {
  matchId: any;
  team1: any;
  team2: any;
  isLoaderShow!: boolean;
  public wicketdata: any;
  public batsmandata: any;
  public bowlerdata: any;
  innfirstbatsmens!: any[];
  allbatsman!: any[];
  allbowler!: any[];
  innnings: any;
  inningsedit: any;

  constructor(private serviceService: ApiservicesService, public  router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.team1 = this.route.snapshot.params['team1'];
    this.team2 = this.route.snapshot.params['team2'];
    this.inningsedit = this.route.snapshot.params['innings']
    this.getWicketData();
    this.showAllWicket();
    this.batsmanData();
    this.bowlerData();
  }

  getWicketData() {
    this.isLoaderShow = true;
    if(this.inningsedit != ''){
      this.innnings =this.inningsedit;
    }else{
      this.innnings = localStorage.getItem('innig');
    }

    this.serviceService.getWicketData(this.matchId, this.team1, this.team2,this.innnings).subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        // console.log(data['data'][0]['batsman']);
        this.batsmandata = data['data'][0]['batsman'];
        this.bowlerdata = data['data'][0]['bowler'];
        console.log(this.bowlerdata);
        this.wicketdata = data;
        // console.log(data[0]['inning1_batsman']);
        this.showAllWicket();
        this.batsmanData();
        this.bowlerData();
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Wicket data', 'Close');
      });
  }

  showAllWicket() {
    // console.log(this.wicketdata.data);
    this.innfirstbatsmens = [];
    for (let i = 0; i < this.wicketdata.data.length; i++) {
      this.innfirstbatsmens.push({
        wiketnumber : i + 1,
        wicketid: this.wicketdata.data[i]['wicket_id'],
        batsman_id: this.wicketdata.data[i]['batsman_id'],
        bowler_id: this.wicketdata.data[i]['bowler_id'],
        over: this.wicketdata.data[i]['over'],
        run: this.wicketdata.data[i]['run'],
        wicket_type: this.wicketdata.data[i]['wicket_type'],
        wicket_by: this.wicketdata.data[i]['wicket_by']
      });
    }
  }

  batsmanData() {
    this.allbatsman = [];
    for (let i = 0; i < this.batsmandata.length; i++) {
      this.allbatsman.push({
        batsmanid: this.batsmandata[i]['player_id'],
        batsmanname: this.batsmandata[i]['player_name']
      });
    }
    console.log(this.allbatsman);
  }

  bowlerData() {
    this.allbowler = [];
    for (let i = 0; i < this.bowlerdata.length; i++) {
      this.allbowler.push({
        bowlerid: this.bowlerdata[i]['player_id'],
        bowlername: this.bowlerdata[i]['player_name']
      });
    }
    console.log(this.allbowler);
  }

  updateWicket(wicketid: any, batsmanid: any, bowlerid: any, over: any, run: any, wickettype: any, wicketby: any) {
    this.isLoaderShow = true;
    const wicketArray = {
      batsman: batsmanid,
      bowler: bowlerid,
      over: over,
      run: run,
      wicket_type: wickettype,
      wicket_by: wicketby,
      wicket_id: wicketid
    };
    console.log(wicketArray);

    this.serviceService.updateWicket(wicketArray).subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Edit Wicket Updated Successfully', 'Close');
        this.getWicketData();
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Some Error During Update Wicket', 'Close');
      });
  }

  deleteWicket(wicketid: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete wicket');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteWicket(wicketid).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Wicket Delete Successfully', 'Close');
          this.getWicketData();
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Wicket Delete Failed', 'Close');
        });
    }
  }

  goScoreboard() {
    this.router.navigate(['/editmatch']);
  }

}
