import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-livescoreedit',
  templateUrl: './livescoreedit.component.html',
  styleUrls: ['./livescoreedit.component.css']
})
export class LivescoreeditComponent implements OnInit {
  MatchId: any;
  isLoaderShow!: boolean;
  txtteam1name: any;
  txtteam2name: any;
  txtteam1score: any;
  txtteam2score: any;
  txtteam1over: any;
  txtteam2over: any;
  txtteam1wicket: any;
  txtteam2wicket: any;
  txtbatsman1: any;
  txtbatsman2: any;
  txtbatsman1ball: any;
  txtbatsman2ball: any;
  txtbatsman1run: any;
  txtbatsman2run: any;
  txtbatsman1four: any;
  txtbatsman2four: any;
  txtbatsman1six: any;
  txtbatsman2six: any;
  txtbowlername: any;
  txtbowlerball: any;
  txtbowlerrun: any;
  txtbowlerwicket: any;
  txtinnings: any;
  txtfirstmsg: any;
  txtsecondmsg: any;
  teamdetail: any[] = [];
  team: any;
  teamName1ID: any;
  teamName2ID: any;

  constructor(private serviceService: ApiservicesService, public  router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.MatchId = this.route.snapshot.params['matchId'];
    this.getLivescoredata();
  }

  getLivescoredata() {
    this.isLoaderShow = true;
    this.serviceService.getLivescoredata(this.MatchId)
    .subscribe(
      (data:any) => {
        this.isLoaderShow = false;
       this.txtteam1name = data['team1'];
       this.txtteam2name = data['team2'];
       this.txtteam1score = data['team1_score'];
       this.txtteam2score = data['team2_score'];
       this.txtteam1over = data['team1_over'];
       this.txtteam2over = data['team2_over'];
       this.txtteam1wicket = data['team1_wicket'];
       this.txtteam2wicket = data['team2_wicket'];
       this.txtbatsman1 = data['bastman1_name'];
       this.txtbatsman2 = data['bastman2_name'];
       this.txtbatsman1ball = data['bastman1_ball'];
       this.txtbatsman2ball = data['bastman2_ball'];
       this.txtbatsman1run = data['bastman1_run'];
       this.txtbatsman2run = data['bastman2_run'];
       this.txtbatsman1four = data['bastman1_4s'];
       this.txtbatsman2four = data['bastman2_4s'];
       this.txtbatsman1six = data['bastman1_6s'];
       this.txtbatsman2six = data['bastman2_6s'];
       this.txtbowlername = data['bowler_name'];
       this.txtbowlerball = data['bowler_ball'];
       this.txtbowlerrun = data['bowler_run'];
       this.txtbowlerwicket = data['bowler_wicket'];
       this.txtinnings = data['innings'];
       this.txtfirstmsg = data['firstmsg'];
       this.txtsecondmsg = data['secondmsg'];
      },
      (error:any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Live Score', 'Close');
      });
  }

  updateLiveMatch() {
    let matchIdArray = {};
    if (this.MatchId !== undefined) {
      matchIdArray = {
        match_id: this.MatchId,
      };
    }

    const MatchArray = {
      series: window.localStorage.getItem('selectedSeries'),
      // team1_id: this.teamName1ID,
      team1: this.txtteam1name,
      team1_score: this.txtteam1score,
      team1_over: this.txtteam1over,
      team1_wicket: this.txtteam1wicket,
      team2: this.txtteam2name,
      team2_score: this.txtteam2score,
      team2_over: this.txtteam2over,
      team2_wicket: this.txtteam2wicket,
      bastman1_name: this.txtbatsman1,
      bastman1_run: this.txtbatsman1run,
      bastman1_4s: this.txtbatsman1four,
      bastman1_6s: this.txtbatsman1six,
      bastman2_name: this.txtbatsman2,
      bastman2_run: this.txtbatsman2run,
      bastman2_4s: this.txtbatsman2four,
      bastman2_6s: this.txtbatsman2six,
      bowler_name: this.txtbowlername,
      bowler_ball: this.txtbowlerball,
      bowler_run: this.txtbowlerrun,
      bowler_wicket: this.txtbowlerwicket
    };

    if (this.txtteam1name === '' || this.txtteam1name == null || this.txtteam1name === undefined) {
      this.serviceService.openSnackBar('Please Select Playername 1', 'Close');
    } else if (this.txtteam2name == null || this.txtteam2name === undefined) {
      this.serviceService.openSnackBar('Please Select Playername 2', 'Close');
    } else if (this.txtteam1over === '' || this.txtteam1over == null || this.txtteam1over === undefined) {
      this.serviceService.openSnackBar('Please Enter Team 1 Over', 'Close');
    } else if (this.txtbowlername === '' || this.txtbowlername == null || this.txtbowlername === undefined) {
      this.serviceService.openSnackBar('Please Select Bowler name', 'Close');
    } else {
      console.log();
      this.serviceService.updateLiveMatch(MatchArray, this.MatchId).subscribe(
        (data:any) => {
          this.serviceService.openSnackBar('Match Updated Successfully', 'Close');
          this.router.navigate(['/matches']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Match', 'Close');
        });
    }
  }

  back() {
    this.router.navigate(['/matches']);
  }

}
