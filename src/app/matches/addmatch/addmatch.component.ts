import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ApiservicesService } from 'src/app/apiservices.service';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/app-material/date.adapter';
import * as moment from 'moment';

@Component({
  selector: 'app-addmatch',
  templateUrl: './addmatch.component.html',
  styleUrls: ['./addmatch.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddmatchComponent implements OnInit {
  teamdetail: any[] = [];
  team: any;
  firstTeam: '' | undefined;
  teamName1ID: any;
  secondTeam: '' | undefined;
  teamName2ID: any;
  txtOver: any;
  txtTime: any;
  txtMatchType: any;
  txtMatchdate: any;
  txtStartTime!: Date;
  txtEndTime: any;
  timeslot: any;
  time: any;
  startTime: any;
  endTime: any;
  isLoaderShow = false;
  MatchId: any;
  timest: any;
  timeft: any;
  StartTime: any;
  EndTime: any;
  txtMatchstatus: any;
  txtTeam1score: any;
  txtTeam2score: any;
  txtTeam1over: any;
  txtTeam2over: any;
  txtTeam1wicket: any;
  txtTeam2wicket: any;
  txtfreeze: any;
  // dt1: any;
  t1:any;
  t2:any;
  @ViewChild('dt1') public dt1: any;
  txth: any;
  txtm: any;
  txtampm: any;
  txteh: any;
  txtem: any;
  txteampm: any;
  stime:any;
  etime:any;
  ftime:any;
  sformate:any;
  sh:any;
  team_name:any;
  tid:any;
  constructor(private serviceService: ApiservicesService, public  router: Router, public route: ActivatedRoute) { }

  ngOnInit( ) {
    this.MatchId = this.route.snapshot.params['MatchId'];
    this.tid=window.localStorage.getItem('t_id'); 
    console.log(this.tid);
    if (this.MatchId !== undefined) {
      this.getmatchdatabyid();
    }
    this.getTeamdetail();
  }

  getTeamdetail() {
    this.serviceService.getTeamdetail()
    .subscribe( data => {
                this.teamdetail.push(data);
                this.team = this.teamdetail[0].data;
                // console.log(this.team);
    });
  }
  getmatchdatabyid() {
    this.isLoaderShow = true;
    this.serviceService.getmatchdatabyid(this.MatchId)
    .subscribe(
      (data:any) => {
        let dateFormat = '';
        const dateArr = data['match_date'].split('/');
        dateFormat = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
        // console.log(data['timeslot']);
        // console.log(data['timeslot'].split('-'));
        this.sformate= data['timeslot'].split(':');
      //  const sh= this.sformate.substr("",2);
        // console.log(this.sformate);
        // console.log(data['timeslot'].split(' '));
        // this.txth=this.sformate[0];
        this.txth=data['timeslot'].substr(0,2);
        this.txtm=data['timeslot'].substr(3,2);
       
        this.txtampm=data['timeslot'].substr(6,2);

        this.txteh=data['timeslot'].substr(11,2);
        this.txtem=data['timeslot'].substr(14,2);
        
        this.txteampm=data['timeslot'].substr(17,3);
        this.isLoaderShow = false;
        this.firstTeam = data['team1_12'];
        this.secondTeam = data['team2_12'];
        // this.t1 = data['team1_12'];
        // this.t2 = data['team2_12'];
        this.txtOver = data['over'];
        this.time = data['timeslot'];
        const timeArr = this.time.split('-');
        const timeArr1 = dateFormat + ' ' + timeArr[0];
        this.txtStartTime = new Date(timeArr1);

        const timeArr2 = dateFormat + ' ' + timeArr[1];
        this.txtEndTime = new Date(timeArr2);
        this.txtMatchType = data['match_type'];
        this.txtMatchdate = new Date(dateFormat);
        this.txtMatchstatus = data['status'];
        this.txtTeam1score = data['team1_score'];
        this.txtTeam2score = data['team2_score'];
        this.txtTeam1over = data['team1_over'];
        this.txtTeam2over = data['team2_over'];
        this.txtTeam1wicket = data['team1_wicket'];
        this.txtTeam2wicket = data['team2_wicket'];
        this.txtfreeze = data['freeze'];
        // console.log(data);
      },
      
      error => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Team', 'Close');
      });
     
  }

  save() {

    let matchIdArray = {};
    if (this.MatchId !== undefined) {
      matchIdArray = {
        match_id: this.MatchId,
      };
    }

    let finalDate = '';
    let date = '';
    let month = '';
    const datetime = new Date(this.txtMatchdate);
    const dd = datetime.getDate();
    const mm = datetime.getMonth() + 1;
    const yyyy = datetime.getFullYear();
    if (dd < 10) {
      date = `0${dd}`;
    } else {
      date = `${dd}`;
    }
    if (mm < 10) {
      month = `0${mm}`;
    } else {
      month = `${mm}`;
    }
    finalDate = `${date}/${month}/${yyyy}`;
       this.startTime =  new Date(this.txtStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      //  console.log(this.startTime);
        this.endTime = new Date(this.txtEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // console.log(this.endTime);
        this.time =  this.startTime + ' - ' + this.endTime;

    const teamname = this.firstTeam;
    // tslint:disable-next-line: triple-equals
    const index =  _.findIndex(this.team, function(o:any) {return o.team_id == teamname; });
    console.log(this.firstTeam);
    if (this.firstTeam === '' || this.firstTeam == null || this.firstTeam === undefined) {
      this.serviceService.openSnackBar('Please Select Team 1', 'Close');
    }
    if (this.secondTeam === '' || this.secondTeam == null || this.secondTeam === undefined) {
      this.serviceService.openSnackBar('Please Select Team 2', 'Close');
    }
    // console.log(this.team[index].team_name);
    this.teamName1ID =  this.team[index].team_name ;
    // console.log(this.teamName1ID);
    const team2name = this.secondTeam;
    // tslint:disable-next-line: triple-equals
    const index2 =  _.findIndex(this.team, function(o:any) {return o.team_id == team2name; });
    this.teamName2ID =  this.team[index2].team_name ;

    // console.log(this.firstTeam);
    // console.log(this.t1);03:02 PM - 05:02 PM
    this.stime= this.txth+':'+this.txtm+' '+this.txtampm;
    this.etime= this.txteh+':'+this.txtem+' '+this.txteampm;
    this.ftime= this.stime+' '+'-'+' '+this.etime;
    // console.log(this.stime)
    const MatchArray = {
      series: window.localStorage.getItem('selectedSeries'),
      team_1: this.teamName1ID,
      team1_12: this.firstTeam,
      team_2: this.teamName2ID,
      team2_12: this.secondTeam,
      over: this.txtOver,
      timeslot: this.ftime,
      match_type: this.txtMatchType,
      match_date: finalDate,
      status: this.txtMatchstatus,
      team1_score: this.txtTeam1score,
      team2_score: this.txtTeam2score,
      team1_over: this.txtTeam1over,
      team2_over: this.txtTeam2over,
      team1_wicket: this.txtTeam1wicket,
      team2_wicket: this.txtTeam2wicket,
      freeze: this.txtfreeze,
      tid:this.tid,
      ...matchIdArray
    };
    console.log(MatchArray);
    // console.log("---"+this.firstTeam);
    if (this.firstTeam === '' || this.firstTeam == null || this.firstTeam === undefined) {
      this.serviceService.openSnackBar('Please Select Team 1', 'Close');
    } else if (this.secondTeam == null || this.secondTeam === undefined) {
      this.serviceService.openSnackBar('Please Select Team 2', 'Close');
    } else if (this.txtOver === '' || this.txtOver == null || this.txtOver === undefined) {
      this.serviceService.openSnackBar('Please Enter Over', 'Close');
    } 
    // else if (this.txtStartTime == null || this.txtStartTime === undefined) {
    //   this.serviceService.openSnackBar('Please Enter StartTime', 'Close');
    // } else if (this.txtEndTime == null || this.txtEndTime === undefined) {
    //   this.serviceService.openSnackBar('Please Enter EndTime', 'Close');
    // }
    else if (this.txth == null || this.txth === undefined) {
      this.serviceService.openSnackBar('Please Enter StartTime hours', 'Close');
    }
    else if (this.txtm == null || this.txtm === undefined) {
      this.serviceService.openSnackBar('Please Enter StartTime Minute', 'Close');
    }
    else if (this.txtampm == null || this.txtampm === undefined) {
      this.serviceService.openSnackBar('Please Enter StartTime AM/PM', 'Close');
    }
    else if (this.txteh == null || this.txteh === undefined) {
      this.serviceService.openSnackBar('Please Enter EndTime hours', 'Close');
    }
    else if (this.txtem == null || this.txtem === undefined) {
      this.serviceService.openSnackBar('Please Enter EndTime Minute', 'Close');
    }
    else if (this.txteampm == null || this.txteampm === undefined) {
      this.serviceService.openSnackBar('Please Enter EndTime AM/PM', 'Close');
    }

    else if (this.txtMatchdate === '' || this.txtMatchdate == null || this.txtMatchdate === undefined) {
      this.serviceService.openSnackBar('Please Select Match Date', 'Close');
    } else {
      this.isLoaderShow = true;
      if (this.MatchId !== undefined) {
        this.serviceService.updateMatch(MatchArray).subscribe(
          data => {
            this.serviceService.openSnackBar('Match Updated Successfully', 'Close');
            this.router.navigate(['/matches']);
          },
          error => {
            this.isLoaderShow = false;
            this.serviceService.openSnackBar('Some Error During Update Match', 'Close');
          });
      } else {
        this.serviceService.addMatch(MatchArray)
        .subscribe( data => {
          this.serviceService.openSnackBar('Match Added Successfully', 'Close');
          this.router.navigate(['/matches']);
        },
        error => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Add Match', 'Close');
        });
    }
    }
  }

  back() {
    this.router.navigate(['/matches']);
  }

  livescoreedit() {
    this.router.navigate(['/livescoreedit', {'matchId': this.MatchId}], {skipLocationChange: true});
  }

  playerscoreedit() {
    this.router.navigate(['/playerscoreedit', {'matchId': this.MatchId}], {skipLocationChange: true});
  }

}