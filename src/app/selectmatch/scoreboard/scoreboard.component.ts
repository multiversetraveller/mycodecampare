import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';
import * as _ from 'lodash';
import { LivescoreService } from 'src/app/livescore.service';
export interface DialogData {
  team1_wicket: any;
  team1_over: any;
  team1_score: any;
  firstmsg: any;
  secondmsg: any;
  inning: string;
  bowler: string;
  changeType: string;
  team1Id: string;
  team2Id: string;
  matchId: any;
  innings: any;
  wicketType: any;
  bowlEdited: any;
  nextBall: any;
  bowlerId: any;
  striker: any;
  batsman2Id: any;
  batsman1Id: any;
  batsman2: any;
  batsman1: any;
  animal: string;
  name: string;
}
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  public scoreBtnHeight: any;
  public scoreBtnHeight2: any;
  public bgcolrseff: any;
  public wideText = 'WD';
  public byeText = 'BYE';
  public lbText = 'LB';
  public liveMatchData: any;
  public message!: string;
  public score!: string;
  public messages: string[] = [];
  public singleText: any = 0;
  public sixText: any = 0;
  public fourText: any = 0;
  public animal!: string;
  public name!: string;
  public matchId: any;
  public liveScoreBowlerData: any;
  public liveScoreData: any;
  public getlastball: any;

  public wicketid: any;
  public nextBall: any;
  public totalExtra = 0;
  public totalRun: any = 0;
  public totalRunforsix: any = 0;
  public runs: any = 0;
  public extra = 0;
  public oldWideVal = 0;
  public oldByeVal = 0;
  public oldLbVal = 0;
  public extraInputOld = 0;
  public singleValOld = 0;
  public singleValOldforsix = 0;
  public noBallText = 'NB';
  public noBallRun = 0;
  public wickets = {};
  public isLoaderShow = false;
  public fromWhich = '';
  public bowlEdited = false;
  public editedScoreId: any;
  public editedWicketType = '';
  public liveScor: any;
  public nextBll: any;
  public matchseries1: any;
  public moduletype: any;
  public jsonarray: any;
  public mtype1: any;
  public fullMatchData: any;
  public ballbatsman: any;
  public team1!: any;
  public team2: any;
  addType: any;
  bgcolrsefnb!: string;
  bgcolrseffsix!: string;
  bgcolrsefffour!: string;
  bgcolrsefrun!: string;
  bgcolrsefwd!: string;
  bgcolrseflb!: string;
  bgcolrsefbye!: string;
  bgcolrsefextra!: string;
  last: any[]=[];
  lastballs: any;
  setfalse!: boolean;
  undoball!: string;
  // secondmsg:any;
  // team1_score:any;
  // team1_over:any;
  // team1_wicket:any;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private servicesService: ApiservicesService, private liveservice: LivescoreService) {
    this.scoreBtnHeight = (window.innerHeight - 395) / 5 + 'px';
    this.scoreBtnHeight2 = (window.innerHeight - 430) / 5 + 'px';



  }

  /**
   * Call function on page load
   */


  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    // console.log(this.matchId);
    this.getLiveScore();
    this.liveservice.getMessages().subscribe((message: string) => {
      this.messages.push(message);
      // console.log(this.messages);
      // console.log(this.message)
    });

  }

  /**
   * Refresh Score
   */
  refresh() {
    this.getLiveScore();

  }

  /**
   * Call API For get live score
   */

  getLiveScore() {
    this.bowlEdited = false;
    this.isLoaderShow = true;
    this.liveScoreData = [];
    this.liveScoreBowlerData = [];
    this.last = [];
    this.servicesService.getLiveScore(this.matchId).subscribe(
      (      data: any) => {
        this.liveScoreData.push(data);
        this.liveScoreData = this.liveScoreData[0];
      this.last.push(this.liveScoreData.overball[JSON.stringify(this.liveScoreData.overball.length-1)]);
      console.log(this.last) 
      if(this.last[0] == undefined){
        this.setfalse = false;
        // this.servicesService.openSnackBar('No ball found!', 'Close');
      }
      else{
        this.setfalse =true;
      }
        window.localStorage.setItem('innig', this.liveScoreData.innings);
        if (this.liveScoreData.innings === '1') {
          this.nextBall = (Number(this.liveScoreData.team1_over) + 0.1).toFixed(1);
          // console.log(this.nextBall, '--------------------------nextball');
          // this.sendMessage(this.liveMatchData, this.jsonarray);
        } else {
          this.nextBall = (Number(this.liveScoreData.team2_over) + 0.1).toFixed(1);
        }
        // if(this.liveScoreData.innings == '1' && this.liveScoreData.team1_over  >= this.liveScoreData.matchover){
        //       this.servicesService.endInning(this.matchId).subscribe(
        //         data => {
        //           this.getLiveScore();

        //         });
        //     }


        this.isLoaderShow = false;
      });
  }

  getLiveMatch() {
    this.liveMatchData = [];
    this.servicesService.getLiveMatchData().subscribe(
      (      data: any) => {
        this.liveMatchData.push(data);
        this.liveMatchData = this.liveMatchData[0];
        // console.log(this.liveMatchData);
      });
  }
  sendMessage(message: any, jsonarray: any) {
    this.matchseries1 = localStorage.getItem('selectedSeries');
    this.mtype1 = window.localStorage.getItem('tourType');
    this.moduletype = "scoring";
    this.jsonarray = {
      "col1": { "matchseries1": this.matchseries1, "mtype1": this.mtype1, "moduletype": this.moduletype }
    }
    // console.log(_.cloneDeep(message, jsonarray));
    // console.log(message);
    setTimeout(() => {
      this.liveservice.sendMessage(message, this.jsonarray);
    }, 500);
  }




  /**
   * Call when extra plus
   * @param event event
   */
  extraPlus(event:any) {
    const val = Number(event.target.value);
    this.totalRun = this.totalRun - this.extraInputOld;
    this.totalExtra = this.totalExtra - this.extraInputOld;
    this.extraInputOld = val;
    if (this.extraInputOld != 0) {
      this.bgcolrsefextra = '#cccccc';
    } else {
      this.bgcolrsefextra = '';
    }
    this.totalRun = this.totalRun + val;
    this.totalExtra = this.totalExtra + val;
  }

  /**
   * Call when change bat run
   * @param val val
   */
  singleChange(val:any) {
    this.totalRun = this.totalRun - this.singleValOld;
    this.singleText = val;
    this.bgcolrsefrun = '#cccccc';
    this.singleValOld = val;
    this.totalRun = parseInt(this.totalRun) + parseInt(val);
  }

  fourchange(val: any) {
    this.resetAllVal();
    this.totalRun = this.totalRun - this.singleValOldforsix;
    this.fourText = val;
    this.sixText = 0;
    this.bgcolrsefffour = '#cccccc';
    this.singleValOldforsix = val;
    this.totalRun = parseInt(this.totalRun) + parseInt(val);
  }

  sixChange(val:any) {
    this.resetAllVal();
    this.totalRun = this.totalRun - this.singleValOldforsix;
    this.sixText = val;
    this.fourText = 0;
    this.bgcolrseffsix = '#cccccc';
    this.singleValOldforsix = val;
    this.totalRun = parseInt(this.totalRun) + parseInt(val);
  }
  /**
   * call when wide change
   * @param val val
   */
  wideChange(val: number) {
    this.resetAllVal();
    const VALUE = val + 1;
    this.totalRun = this.totalRun - this.oldWideVal;
    this.totalExtra = this.totalExtra - this.oldWideVal;
    this.wideText = `WD+${val}`;
    this.bgcolrsefwd = '#cccccc';
    this.oldWideVal = VALUE;
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }

  /**
   * call when bye change
   * @param val val
   */
  byeChange(val: number) {
    this.resetAllVal();
    const VALUE = val + 0;
    this.totalRun = this.totalRun - this.oldByeVal;
    this.totalExtra = this.totalExtra - this.oldByeVal;
    this.byeText = `BYE+${val}`;
    this.bgcolrsefbye = '#cccccc';
    this.oldByeVal = VALUE;
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }

  /**
   * call when lb change
   * @param val val
   */
  lbChange(val: number) {
    this.resetAllVal();
    const VALUE = val + 0;
    this.totalRun = this.totalRun - this.oldLbVal;
    this.totalExtra = this.totalExtra - this.oldLbVal;
    this.lbText = `LB+${val}`;
    this.bgcolrseflb = '#cccccc';
    this.oldLbVal = VALUE;
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }

  /**
   * Call when no ball added
   * @param nbRuns nbRuns
   * @param fromWhich fromWhich
   */
  addNoBall(nbRuns: number, fromWhich: string) {
    this.resetAllVal();
    this.noBallText = `${nbRuns}NB`;
    this.noBallRun = nbRuns;
    this.fromWhich = fromWhich;
    this.totalRun = this.totalRun + nbRuns;
    this.totalExtra = this.totalExtra + nbRuns;
  }

  /**
   * Open wicket dialog
   */
  openWicketDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(DialogOverviewExampleDialog, {
      width: '320px',
      autoFocus: false,
      data: {
        batsman1: this.liveScoreData.bastman1_name,
        batsman2: this.liveScoreData.bastman2_name,
        batsman1Id: this.liveScoreData.bastman1_id,
        batsman2Id: this.liveScoreData.bastman2_id,
        striker: this.liveScoreData.strike,
        nextBall: this.nextBall,
        bowlerId: this.liveScoreData.bowler_id,
        innings: this.liveScoreData.innings,
        team1Id: this.liveScoreData.team1_id,
        team2Id: this.liveScoreData.team2_id,
        bowlEdited: this.bowlEdited,
        matchId: this.matchId,
        wicketType: this.editedWicketType
      }
    });

    DIALOGREF.afterClosed().subscribe((result: string) => {
      if (result !== 'close') {
        this.wickets = result;
        this.bgcolrseff = '#cccccc';
      }
    });
  }
  /**
    * editscore-card
    */
  /**
    * Open Push dialog
    */
  openPushDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(Pushpop, {
      width: '500px',
      autoFocus: false,
      backdropClass: 'blue',
      data: {
        batsman1: this.liveScoreData.bastman1_name,
        batsman2: this.liveScoreData.bastman2_name,
        batsman1Id: this.liveScoreData.bastman1_id,
        batsman2Id: this.liveScoreData.bastman2_id,
        striker: this.liveScoreData.strike,
        nextBall: this.nextBall,
        bowlerId: this.liveScoreData.bowler_id,
        innings: this.liveScoreData.innings,
        team1Id: this.liveScoreData.team1_id,
        team2Id: this.liveScoreData.team2_id,
        bowlEdited: this.bowlEdited,
        matchId: this.matchId,
        wicketType: this.editedWicketType,
        secondmsg: this.liveScoreData.secondmsg,
        firstmsg: this.liveScoreData.firstmsg,
        team1_score: this.liveScoreData.team1_score,
        team1_over: this.liveScoreData.team1_over,
        team1_wicket: this.liveScoreData.team1_wicket,
        team2: this.team2,


      }

    });
    DIALOGREF.afterClosed().subscribe((result: string) => {
      if (result !== 'close') {
        // this.addNoBall(result.nbrun, result.fromwhich);
        this.getLiveScore();
      }
    });
  }

  /**
   * Open no ball dialog
   */
  openNoBallDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(NoBallDialog, {
      width: '320px',
      autoFocus: false
    });

    DIALOGREF.afterClosed().subscribe((result: any) => {
      if (result !== 'close') {
        this.addNoBall(result.nbrun, result.fromwhich);
        this.bgcolrsefnb = '#cccccc';
      }
    });
  }

  goScoreboard() {
    this.router.navigate(['/editscorecard', { 'matchId': this.matchId }]);
  }
  //  editScorecard(){

  // const DIALOGREF = this.dialog.open(DialogEditscorecard, {
  //   width: '520px',
  //   height:'400px',
  //   data:{
  //     matchId: this.matchId,
  //     innings: this.liveScoreData.innings
  //   }
  // });

  // DIALOGREF.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);

  //   this.liveScor = result;
  //   this.liveScoreData = this.liveScor[0];
  // this.getLiveScore();

  // console.log(this.liveScor);


  // });
  // }

  /**
   * Open change batsman or bowler dialog
   * @param type type
   */
  openSelectPlayerDialog(type: any) {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(SelectPlayerDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '90%',
      data: {
        changeType: type,
        matchId: this.matchId,
        batsman1: this.liveScoreData.bastman1_id,
        batsman2: this.liveScoreData.bastman2_id,
        bowler: this.liveScoreData.bowler_id,
        inning: this.liveScoreData.innings
      }
    });

    DIALOGREF.afterClosed().subscribe((result: string) => {
      if (result === 'yes') {
        this.getLiveScore();
      }
    });
  }

  /**
   * call addscore api and update bowl api
   */
  addScore(addType: string) {
    const isValidate = this.checkValidation();

    const singles = this.checkBatRuns();
    const singlefoursix = this.checkbatforsixruns();
    const wides = this.checkWide();
    const noBalls = this.checkNoBall();
    const byes = this.checkByes();
    const legByes = this.checkLegByes();
    const inningWise = this.setInningWiseData();
    const editScore = this.checkBowlEdited();
    const data = {
      'hdninning': this.liveScoreData.innings,
      'hdnmatch_id': this.liveScoreData.match_id,
      'hdnbatsman1': this.liveScoreData.bastman1_id,
      'hdnbatsman2': this.liveScoreData.bastman2_id,
      ...inningWise,
      'hdnbowler': this.liveScoreData.bowler_id,
      'chk_batsman': this.liveScoreData.strike,
      'over': this.nextBall,
      ...singles,
      ...singlefoursix,
      ...wides,
      ...noBalls,
      ...byes,
      ...legByes,
      ...this.wickets,
      ...editScore,
      'extra': this.extraInputOld,
      'total_extra': this.totalExtra,
      'total_run': this.totalRun,
      'series': window.localStorage.getItem('selectedSeries')
    };
    // console.log(data);
    if (isValidate) {
      this.isLoaderShow = true;
      if (addType === 'save') {
        this.servicesService.addScore(data).subscribe(
          (          // tslint:disable-next-line: no-shadowed-variable
          data: any) => {
            this.getLiveScore();
            this.resetAllVal();
            this.getLiveMatch();
            this.sendMessage(this.liveMatchData, this.jsonarray);
            this.totalRun = '';
            this.totalRunforsix = '';
          },
          (          error: any) => {
            this.servicesService.openSnackBar('Error while adding score', 'Close');
            this.isLoaderShow = false;
          });
      } else {
        this.servicesService.updateSingleBowl(data).subscribe(
          (          // tslint:disable-next-line: no-shadowed-variable
          data: any) => {
            this.getLiveScore();
            this.resetAllVal();
            this.getLiveMatch();
            this.sendMessage(this.liveMatchData, this.jsonarray);
          },
          (          error: any) => {
            this.servicesService.openSnackBar('Error while adding score', 'Close');
            this.isLoaderShow = false;
          });
      }
    }

  }

  /**
   * Check bowl edited or not
   * 
   */
  checkBowlEdited() {
    if (this.editScore!) {
      return { 'score_id': this.editedScoreId };
    } else {
      return '';
    }
  }

  /**
   * Check Validation for add live score
   */
  checkValidation() {
    if (this.liveScoreData.bowler_id === '' || this.liveScoreData.bowler_id === 0 || this.liveScoreData.bowler_id === undefined) {
      this.servicesService.openSnackBar('Please Select Bowler', 'Close');
      return false;
    } else if (this.liveScoreData.bastman1_id === '' || this.liveScoreData.bastman1_id === 0 || this.liveScoreData.bastman1_id === undefined) {
      this.servicesService.openSnackBar('Please Select Batsman', 'Close');
      return false;
    } else if (this.liveScoreData.bastman2_id === '' || this.liveScoreData.bastman2_id === 0 || this.liveScoreData.bastman1_id === undefined) {
      this.servicesService.openSnackBar('Please Select Batsman', 'Close');
      return false;
    } else if (this.liveScoreData.strike === '' || this.liveScoreData.strike === 0 || this.liveScoreData.bastman1_id === undefined) {
      this.servicesService.openSnackBar('Please Select Striker', 'Close');
      return false;
    } else if (this.liveScoreData.bastman1_id !== this.liveScoreData.strike
      && this.liveScoreData.bastman2_id !== this.liveScoreData.strike) {
      this.servicesService.openSnackBar('Please Select Striker', 'Close');
      return false;
    } else {
      return true;
    }
  }

  /**
   * Prepare inning wise data array for scoring
   */
  setInningWiseData() {
    if (this.liveScoreData.innings === '1') {
      return {
        'hdnstrike': this.liveScoreData.team1_over,
        'hdnover': this.liveScoreData.team1_over,
        'hdntotal_run': this.liveScoreData.team1_score,
        'hdnwicket': this.liveScoreData.team1_wicket,
        'hdnteam1': this.liveScoreData.team1,
        'hdnteam2': this.liveScoreData.team2
      };
    } else {
      return {
        'hdnstrike': this.liveScoreData.team2_over,
        'hdnover': this.liveScoreData.team2_over,
        'hdntotal_run': this.liveScoreData.team2_score,
        'hdnwicket': this.liveScoreData.team2_wicket,
        'hdnteam1': this.liveScoreData.team2,
        'hdnteam2': this.liveScoreData.team1,
      };
    }
  }

  /**
   * Check legbyes
   */
  checkLegByes() {
    if (this.fromWhich === '') {
      if (this.oldLbVal > 0) {
        return { 'lb': this.oldLbVal };
      } else {
        return '';
      }
    } else if (this.fromWhich === 'lb') {
      return { 'lb': this.noBallRun - 1 };
    }
  }

  /**
   * check byes
   */
  checkByes() {
    if (this.fromWhich === '') {
      if (this.oldByeVal > 0) {
        return { 'bye': this.oldByeVal };
      } else {
        return '';
      }
    } else if (this.fromWhich === 'bye') {
      return { 'bye': this.noBallRun - 1 };
    }
  }

  /**
   * check no ball
   */
  checkNoBall() {
    if (this.fromWhich === '') {
      if (this.noBallRun > 0) {
        return { 'nb': this.noBallRun };
      } else {
        return '';
      }
    } else {
      if (this.noBallRun > 0) {
        return { 'nb': 1 };
      } else {
        return '';
      }
    }
  }

  /**
   * check wide
   */
  checkWide() {
    if (this.oldWideVal > 0) {
      return { 'wide': this.oldWideVal };
    } else {
      return '';
    }
  }

  /**
   * check run from bat
   */
  checkbatforsixruns() {
    if (this.fourText === 4) {
      return { '4s': 'on' };
    }
    if (this.sixText === 6) {
      return { '6s': 'on' };
    }
  }

  checkBatRuns() {
    if (this.fromWhich === '') {
      if (this.singleText === 0) {
        return { '0s': 'on' };
      }
      if (this.singleText === 1) {
        return { '1s': 'on' };
      }
      if (this.singleText === 2) {
        return { '2s': 'on' };
      }
      if (this.singleText === 3) {
        return { '3s': 'on' };
      }
      if (this.singleText === 4) {
        return { '4s': 'on' };
      }
      if (this.singleText === 5) {
        return { '5s': 'on' };
      }
      if (this.singleText === 6) {
        return { '6s': 'on' };
      }
      if (this.singleText === 7) {
        return { '7s': 'on' };
      }
      if (this.singleText === 8) {
        return { '8s': 'on' };
      }
      if (this.singleText === 9) {
        return { '9s': 'on' };
      }
      if (this.singleText === 10) {
        return { '10s': 'on' };
      }
      if (this.singleText === 11) {
        return { '11s': 'on' };
      }
      if (this.singleText === 12) {
        return { '12s': 'on' };
      }
      if (this.singleText === "6") {
        return { '6s1': 'on' };
      }
      if (this.singleText === "4") {
        return { '4s1': 'on' };
      }
    }


    else if (this.fromWhich === 'bat') {
      const run = this.noBallRun - 1;
      if (run === 0) {
        return { '0s': 'on' };
      }
      if (run === 1) {
        return { '1s': 'on' };
      }
      if (run === 2) {
        return { '2s': 'on' };
      }
      if (run === 3) {
        return { '3s': 'on' };
      }
      if (run === 4) {
        return { '4s': 'on' };
      }
      if (run === 5) {
        return { '5s': 'on' };
      }
      if (run === 6) {
        return { '6s': 'on' };
      }
      if (run === 7) {
        return { '7s': 'on' };
      }
    }
  }

  /**
   * reset all selected runs
   */
  resetAllVal() {
    this.wideText = 'WD';
    this.byeText = 'BYE';
    this.lbText = 'LB';
    this.singleText = 0;
    this.fourText = 0;
    this.sixText = 0;
    this.totalExtra = 0;
    this.totalRun = 0;
    this.runs = 0;
    this.extra = 0;
    this.oldWideVal = 0;
    this.oldByeVal = 0;
    this.oldLbVal = 0;
    this.extraInputOld = 0;
    this.singleValOld = 0;
    this.singleValOldforsix = 0;
    this.noBallText = 'NB';
    this.noBallRun = 0;
    this.wickets = {};
    this.fromWhich = '';
    this.bgcolrseff = '';
    this.bgcolrsefffour = '';
    this.bgcolrseffsix = '';
    this.bgcolrsefnb = '';
    this.bgcolrsefrun = '';
    this.bgcolrsefwd = '';
    this.bgcolrseflb = '';
    this.bgcolrsefbye = '';
    this.bgcolrsefextra = ''
    this.undoball = '';
  }

  /**
   * Call API of change strike of batsman
   * @param playerId playerId
   */
  changeStrike(playerId: any) {
    this.servicesService.changeStrike(playerId, this.matchId).subscribe(
      (      // tslint:disable-next-line: no-shadowed-variable
      data: any) => {
        this.getLiveScore();
        this.getLiveMatch();
        this.sendMessage(this.liveMatchData, this.jsonarray);
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error while Change Strike', 'Close');
        this.isLoaderShow = false;
      });
  }

  /**
   * Call api of end inning
   */
  endInning() {
    const buttonClicked = confirm('Are You Want To Sure End Inning');
    if (buttonClicked === true) {
      this.servicesService.endInning(this.matchId).subscribe(
        (        data: any) => {
          this.getLiveScore();
          this.getLiveMatch();
          this.sendMessage(this.liveMatchData, this.jsonarray);
          this.servicesService.openSnackBar('Now, Second inning is Start', 'Close');
        },
        (        error: any) => {
          this.servicesService.openSnackBar('Error while End Inning', 'Close');
          this.isLoaderShow = false;
        });
    }
  }

  /**
   * call api of end match
   */
  endMatch() {
    const buttonClicked = confirm('Are You Want To Sure End Match');
    if (buttonClicked === true) {
      this.router.navigate(['/whowon', {
        'matchId': this.matchId,
        'team1Name': this.liveScoreData.team1,
        'team2Name': this.liveScoreData.team2,
        'team1Id': this.liveScoreData.team1_id,
        'team2Id': this.liveScoreData.team2_id
      }], { skipLocationChange: true });
      // this.scoretomatchdata();
      // this.matchtopointdata();

    }

  }

  /**
   * Edit score api call
   * @param scoreId scoreId
   */
  editScore(scoreId: any) {
    // console.log("funcc");
    this.resetAllVal();
    this.isLoaderShow = true;
    this.editedScoreId = scoreId;
    this.servicesService.editScore(scoreId, this.matchId).subscribe(
      (      data: any) => {
        this.wicketid = data['wicket_id'];
        this.isLoaderShow = false;
        this.bowlEdited = true;
        this.nextBall = `${data['over']}`;
        this.ballbatsman = `${data['batsman_name']}`;
        window.localStorage.setItem('editedBallBatsmanId', data['batsman_id']);
        window.localStorage.setItem('editedBallBowlerId', data['bowler_id']);
        if (data['wicket'] > 0) {
          this.editedWicketType = data['wicket_type'];
        } else {
          this.editedWicketType = '';
        }
        if (data['nb'] > 0) {
          this.noBallRun = data['nb'];
          this.noBallText = `${data['nb']}NB`;
        } else {
          this.noBallText = 'NB';
        }
        if (data['1s'] > 0) {
          this.singleText = data['1s'];
        } else if (data['2s'] > 0) {
          this.singleText = 2;
        } else if (data['3s'] > 0) {
          this.singleText = 3;
        } else if (data['4s1'] > 0) {
          this.singleText = 4;
        } else if (data['4s'] > 0) {
          this.fourText = 4;
        }
        else if (data['5s1'] > 0) {
          this.singleText = 5;
        } else if (data['6s'] > 0) {
          this.sixText = 6;
        } else if (data['7s'] > 0) {
          this.singleText = 7;
        } else {
          this.singleText = 0;
        }
        if (data['wide'] > 0) {
          this.wideChange(data['wide'] - 1);
        } else {
          this.wideText = 'WD';
        }
        if (data['b'] > 0) {
          this.byeChange(data['b'] - 1);
        } else {
          this.byeText = 'BYE';
        }
        if (data['lb'] > 0) {
          this.lbChange(data['lb'] - 1);
        } else {
          this.lbText = 'LB';
        }
        if (data['total_run'] > 0) {
          this.totalRun = data['total_run'];
        } else {
          this.totalRun = 0;
        }
        if (data['extra'] > 0) {
          this.extra = data['extra'];
        } else {
          this.extra = 0;
        }
        if (data['total_extra'] > 0) {
          this.totalExtra = data['total_extra'];
        } else {
          this.totalExtra = 0;
        }


      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error Fetch Data Of This Ball', 'Close');
        this.isLoaderShow = false;
      });
  }

  deleteBowl(scoreId: any) {
    // console.log("YEYE==>", this.wicketid);
    if (this.wicketid != '' && this.wicketid!=undefined) {
      this.servicesService.openSnackBar('This Ball Will Also Delete Wicket.. ', 'Close');
      setTimeout(() => {
     
      this.servicesService.deleteBowl(scoreId).subscribe(
        (        data: any) => {
          this.getLiveScore();
          this.getLiveMatch();
          // this.servicesService.openSnackBar('Ball Delete Successfully', 'Close');
          this.sendMessage(this.liveMatchData, this.jsonarray);
        },
        (        error: any) => {
          this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
        }
      ); }, 100);
    }else{
      this.servicesService.deleteBowl(scoreId).subscribe(
        (        data: any) => {
          this.getLiveScore();
          this.getLiveMatch();
          this.servicesService.openSnackBar('Ball Delete Successfully', 'Close');
          this.sendMessage(this.liveMatchData, this.jsonarray);
        },
        (        error: any) => {
          this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
        }
      );
    }
  }
  deleteBowls(scoreId:any) {
    this.undoball =  '#cccccc';
    if(scoreId == null){
      this.servicesService.openSnackBar('No ball found!', 'Close');

    }else{
      const buttonClicked = confirm('Are You Want To Sure Delete ball');
      if (buttonClicked === true) {
    
    // console.log("YEYE==>", this.wicketid);
    if (this.wicketid != '' && this.wicketid!=undefined) {
      this.servicesService.openSnackBar('This Ball Will Also Delete Wicket.. ', 'Close');
      setTimeout(() => {
     
      this.servicesService.deleteBowl(scoreId).subscribe(
        (        data: any) => {
          this.getLiveScore();
          this.getLiveMatch();
          // this.servicesService.openSnackBar('Ball Delete Successfully', 'Close');
          this.sendMessage(this.liveMatchData, this.jsonarray);
        },
        (        error: any) => {
          this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
        }
      ); }, 100);
    }else{
      this.servicesService.deleteBowl(scoreId).subscribe(
        (        data: any) => {
          this.getLiveScore();
          this.getLiveMatch();
          this.servicesService.openSnackBar('Ball Delete Successfully', 'Close');
          this.sendMessage(this.liveMatchData, this.jsonarray);
        },
        (        error: any) => {
          this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
        }
      );
    }
    }
  }
  }
  goOverBallPage() {
    this.router.navigate(['/editovers', { 'matchId': this.matchId }], { skipLocationChange: true });
  }
  goEditWicket() {
    this.router.navigate(['/editwicket', { 'matchId': this.matchId, 'team1': this.team1, 'team2': this.team2 }], { skipLocationChange: true });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogOverviewExampleDialog {
  public bowlingPlayers: any;
  public outedBatsmanId: any;
  public takenBowlerId: any;
  public overBall: any;
  public wicketType: any;
  public bowlEdited: any;
  public batsman1Id: any;
  public batsman2Id: any;
  public inning: any;
  public matchId: any;
  public outedBatsman: any;
  public outedWicketType: any;
  liveMatchData!: any[];
  matchseries1!: string;
  mtype1!: string;
  fullMatchData!: any[];
  nbSelect = '';
  batsman1Ids: any;
  batsman2Ids: any;
  batsman1s: any;
  batsman2s: any;
  // batsman1:any;
  // batsman2:any;


  constructor(
    public servicesService: ApiservicesService,
    public dialog: MatDialog,
    public DIALOGREF: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private liveservice: LivescoreService) {
    const datas = [];
    datas.push(data);
    // console.log(datas,'--------')
    this.batsman1s = datas[0].batsman1;
    this.batsman2s = datas[0].batsman2;
    this.batsman1Ids = datas[0].batsman1Id;
    this.batsman2Ids = datas[0].batsman2Id;
    this.outedBatsmanId = datas[0].striker;
    this.takenBowlerId = datas[0].bowlerId;
    this.overBall = datas[0].nextBall;
    this.bowlEdited = datas[0].bowlEdited;
    this.batsman1Id = datas[0].batsman1Id;
    this.batsman2Id = datas[0].batsman2Id;
    this.outedWicketType = datas[0].wicketType;
    this.inning = datas[0].innings;
    this.matchId = datas[0].matchId;
    let bowlingTeamId = '';
    if (datas[0].innings === '1') {
      bowlingTeamId = datas[0].team2Id;
    } else {
      bowlingTeamId = datas[0].team1Id;
    }
    this.getPlayers(bowlingTeamId);
    if (datas[0].bowlEdited) {
      this.getPlayersBatting();
      this.wicketType = this.outedWicketType;
      this.outedBatsmanId = window.localStorage.getItem('editedBallBatsmanId');
      this.takenBowlerId = window.localStorage.getItem('editedBallBowlerId');
    }
  }

  /**
   * Get players by team
   * @param id id
   */
  getPlayers(id: string) {
    this.servicesService.getPlayersByTeam(id).subscribe(
      (      data: any) => {
        this.bowlingPlayers = data;
        this.bowlingPlayers = this.bowlingPlayers.data;
      });
  }

  /**
   * Get players by team
   */
  getPlayersBatting() {
    this.servicesService.getChangeBatsman(this.matchId, this.batsman1Id, this.batsman2Id, this.inning).subscribe(
      (      data: { [x: string]: any; }) => {
        this.outedBatsman = data['wdata'];
      });
  }

  /**
   * call when click on ok button in wicket dialog
   */
  onOkClick(): void {
    const isValid = this.checkValidation();
    if (isValid) {
      const data = {
        wicket: 'on',
        out_batsman: this.outedBatsmanId,
        wicket_over: this.overBall,
        wicket_type: this.wicketType,
        wicket_by: this.takenBowlerId
      };
      this.DIALOGREF.close(data);
    }
  }

  /**
   * Check validation for wicket
   */
  checkValidation() {
    if (this.wicketType) {
      return true;
    } else {
      this.servicesService.openSnackBar('Please Select Wicket Type', 'Close');
      return false;
    }
  }

  /**
   * call when click cancel button
   */
  onCancelClick() {
    this.DIALOGREF.close({});
  }
}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'noball-dialog',
  templateUrl: 'noball-dialog.html',
  styleUrls: ['./scoreboard.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NoBallDialog {
  nbTxtRun = 0;
  nbRun = 0;
  nbRadio = '';
  liveMatchData!: any[];
  matchseries1: any;
  mtype1: any;
  messages: string[] = [];
  jsonarray: any;
  fullMatchData!: any[];
  nbSelect = '';
  bowlEdited = false;
  isLoaderShow = false;
  liveScoreData: any;
  nextBall: any;
  liveScoreBowlerData: any;
  matchIdnoball: any;
  nbruns: any = 1;

  constructor(
    public DIALOGREF: MatDialogRef<NoBallDialog>,
    private servicesService: ApiservicesService,
    private liveservice: LivescoreService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  /**
   * call when input value change from no ball dialog
   */
  ngOnInit() {
    this.matchIdnoball = this.route.snapshot.params['matchId'];
    this.getLiveScore();
    this.liveservice.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  countNbScore(nbruntxt: number) {
    this.nbRun = nbruntxt;
  }
  getLiveScore() {
    this.bowlEdited = false;
    this.isLoaderShow = true;
    this.liveScoreData = [];
    this.liveScoreBowlerData = [];
    this.servicesService.getLiveScore(this.matchIdnoball).subscribe(
      (      data: any) => {
        this.liveScoreData.push(data);
        this.liveScoreData = this.liveScoreData[0];
        window.localStorage.setItem('innig', this.liveScoreData.innings);
        if (this.liveScoreData.innings === '1') {
          this.nextBall = (Number(this.liveScoreData.team1_over) + 0.1).toFixed(1);
        } else {
          this.nextBall = (Number(this.liveScoreData.team2_over) + 0.1).toFixed(1);
        }
        this.isLoaderShow = false;
      });
  }
  getLiveMatch() {
    this.liveMatchData = [];
    this.servicesService.getLiveMatchData().subscribe(
      (      data: any) => {
        this.liveMatchData.push(data);
        this.liveMatchData = this.liveMatchData[0];
      });
  }
  sendMessagenoball(message: any, jsonarray: any) {
    this.matchseries1 = localStorage.getItem('selectedSeries');
    this.mtype1 = localStorage.getItem('tourType');
    this.jsonarray = {
      "col1": { "matchseries1": this.matchseries1, "mtype1": this.mtype1 }
    }
    // console.log(_.cloneDeep(message, jsonarray));
    setTimeout(() => {
      this.liveservice.sendMessage(message, this.jsonarray);
    }, 500);
  }
  nbBySelect(nbSelected: string) {
    this.nbSelect = nbSelected;
  }


  /**
   * Call when click on ok in no ball dialog
   */
  onOkClick(): void {
    // const TOTALNB = this.nbRun + 1;
    // const data = {
    //   nbrun: TOTALNB,
    //   fromwhich: this.nbRadio
    // };
    // this.DIALOGREF.close(data);
    // if (this.nbSelect === '') {
    // alert('Please select Noball by option');

    const TOTALNB = this.nbRun + 1;
    this.getLiveScore();
    this.getLiveMatch();
    // this.sendMessagenoball(this.liveMatchData, this.jsonarray);
    const data = {
      nbrun: TOTALNB,
      fromwhich: this.nbRadio
    };
    this.DIALOGREF.close(data);

  }

  /**
   * Call when click on cancel in no ball dialog
   */
  onCancelClick() {
    this.DIALOGREF.close('close');
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-player-dialog',
  templateUrl: 'select-player-dialog.html',
  styleUrls: ['./scoreboard.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class SelectPlayerDialog {
  changeType = '';
  [x: string]: any;
  type = 'Player';
  teamId = '';
  bowler = '';
  inning = '';
  batsman1 = '';
  batsman2 = '';
  playersTeam: any = [];
  outedPlayers = [];
  matchId = '';
  selectedPlayer = '';
  liveMatchData!: any[];
  matchseries1: any;
  mtype1: any;
  constructor(
    public servicesService: ApiservicesService,
    private liveservice: LivescoreService,
    public DIALOGREF: MatDialogRef<SelectPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,

  ) {
    const datas = [];
    datas.push(data);
    this.changeType = datas[0].changeType;
    this.matchId = datas[0].matchId;
    this.bowler = datas[0].bowler;
    this.inning = datas[0].inning;
    this.batsman1 = datas[0].batsman1;
    this.batsman2 = datas[0].batsman2;
    if (this.changeType === 'bowler') {
      this.type = 'Bowler';
      this.getBowlers();
    } else {
      this.type = 'Batsman';
      this.getBatsman();
    }
  }

  /**
   * Get Bowlers from bowling team
   */
  getBowlers() {
    this.servicesService.getChangeBowlers(this.matchId, this.bowler, this.inning)
      .subscribe(
        (        data: any) => {
          this.playersTeam.push(data);
          this.playersTeam = this.playersTeam[0].data;
        });
  }

  /**
   * Get batsman from batting team
   */
  getBatsman() {
    this.playersTeam = [];
    this.servicesService.getChangeBatsman(this.matchId, this.batsman1, this.batsman2, this.inning)
      .subscribe(
        (data: any) => {
          this.playersTeam.push(data);
          this.outedPlayers = this.playersTeam[0].wdata;
          this.playersTeam = this.playersTeam[0].data;
        });
  }
  getLiveMatch() {
    this.liveMatchData = [];
    this.servicesService.getLiveMatchData().subscribe(
      (      data: any) => {
        this.liveMatchData.push(data);
        this.liveMatchData = this.liveMatchData[0];
      });
  }
  sendMessage(message: any[], jsonarray: any) {
    this.matchseries1 = localStorage.getItem('selectedSeries');
    this.mtype1 = localStorage.getItem('tourType');
    this['jsonarray'] = {
      "col1": { "matchseries1": this.matchseries1, "mtype1": this.mtype1 }
    }
    // console.log(_.cloneDeep(message, jsonarray));
    setTimeout(() => {
      this.liveservice.sendMessage(message, this['jsonarray']);
    }, 500);
  }
  /**
   * Call when click on ok button in change player dialog
   */
  onOkClick(): void {
    if (this.selectedPlayer !== '') {
      console.log(this.selectedPlayer)
      if (this.changeType === 'bowler') {
        this.changeBowler();
      } else if (this.changeType === 'batsman1') {
        this.changeBatsman(1);
      } else if (this.changeType === 'batsman2') {
        this.changeBatsman(2);
      }
    } else {
      this.servicesService.openSnackBar('Please Select Player', 'Close');
    }
  }
onclickfun(id: string):void{
  if(id !== ''){
    this.selectedPlayer = id;
    this.onOkClick();
  }


}
  /**
   * call api for change batsman
   * @param position position
   */
  changeBatsman(position: number) {
    this.servicesService.changeBatsman(this.selectedPlayer, this.matchId, position).subscribe(
      (      data: any) => {
        this.DIALOGREF.close('yes');
        this.getLiveMatch();
        this.sendMessage(this.liveMatchData, this['jsonarray']);
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Change Batsman', 'Close');
      }
    );
  }

  /**
   * call api for change bowler
   */
  changeBowler() {
    this.servicesService.changeBowler(this.selectedPlayer, this.matchId).subscribe(
      (      data: any) => {
        this.DIALOGREF.close('yes');
        this.getLiveMatch();
        this.sendMessage(this.liveMatchData, this['jsonarray']);
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Change Bowler', 'Close');
      }
    );
  }

  /**
   * call when click on cancel in change player dialog
   */
  onCancelClick() {
    this.DIALOGREF.close('no');
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-editscorecard',
  templateUrl: 'dialog-editscorecard.html',
  styleUrls: ['./scoreboard.component.css']
})
export class DialogEditscorecard {
  panelOpenState = false;
  changeType = '';
  bowler: any;
  matchId: any;
  inning: any;
  batsman1: any;
  batsman2: any;
  overmatch :any= [];
  overmatchs: any;

  totalrun: any;
  totalrun_inning1: any;
  totalwicket_inning1: any;
  inning1_over: any;
  overwiseballs = [];
  liveScoreData: any;
  overmatchresults: any;
  nextBall!: string;
  result: any;
  inning1_overs: any;
  inning2_overs: any;
  total_team1over: any;
  total_team2over: any;

  constructor(
    public servicesService: ApiservicesService,
    public DIALOGREF: MatDialogRef<DialogEditscorecard>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(data)
    const datas = [];
    datas.push(data);
    // console.log(datas)
    // this.changeType = datas[0].changeType;
    this.matchId = datas[0].matchId;
    // this.bowler = datas[0].bowler;
    this.inning = datas[0].innings;
    // this.batsman1 = datas[0].batsman1;
    // this.batsman2 = datas[0].batsman2;
  }
  ngOnInit() {
    this.getoverdata();
  }

  getoverdata() {
    this.overmatchs = [];
    this.overmatchs = [];
    this.servicesService.getalloverdata(this.matchId, this.inning)
      .subscribe(
        (        data: any) => {
          this.overmatch.push(data);
          this.overmatchs.push(data);

          this.totalrun_inning1 = this.overmatch[0].total_total_run;
          this.totalwicket_inning1 = this.overmatch[0].total_wicket;

          this.overmatch = this.overmatch[0].data;

          this.inning1_over = this.overmatch[0].over;
          this.inning1_overs = this.overmatchs[0].team1ar;
          this.inning2_overs = this.overmatchs[0].team2ar;


          this.overwiseballs = this.overmatch[0].data;

          this.overmatchs = this.overmatchs[0];

          this.total_team1over = this.overmatchs.team1_over;
          this.total_team2over = this.overmatchs.team2_over;

        });
  }
  deleteallover(over: number) {
    var overs = over + 1;
    // console.log(overs)
    this.servicesService.deleteallover(overs, this.matchId, this.inning).subscribe(
      (      data: any) => {
        this.DIALOGREF.close('yes');
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Deleting Over', 'Close');
      }
    )
    //this.getLiveScore();
  }

  editover(over: any): void {
    this.liveScoreData = [];
    this.servicesService.editScorecard(this.matchId, this.inning, over)
      .subscribe(
        (        data: any) => {
          this.liveScoreData.push(data);
          this.DIALOGREF.close(this.liveScoreData);
        });
  }
}

// code by ashwini
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'push-popup',
  templateUrl: 'push-popup.html',
  styleUrls: ['./scoreboard.component.css']
})
export class Pushpop {
  panelOpenState = false;
  changeType = '';
  bowler: any;
  matchId: any;
  inning: any;
  batsman1: any;
  batsman2: any;
  overmatch = [];
  overmatchs: any;
  totalrun: any;
  totalrun_inning1: any;
  totalwicket_inning1: any;
  inning1_over: any;
  overwiseballs = [];
  liveScoreData: any;
  overmatchresults: any;
  nextBall!: string;
  result: any;
  inning1_overs: any;
  inning2_overs: any;
  total_team1over: any;
  total_team2over: any;
  bowlEdited!: boolean;
  isLoaderShow!: boolean;
  liveScoreBowlerData!: any[];
  innings: any;
  message: any;
  secondmsg: any;
  firstmsg: any;
  team1_score: any;
  team1_over: any;
  team1_wicket: any;
  coln = ":";
  slash = "/";
  over = "over";
  space = ' ';
  constructor(
    public servicesService: ApiservicesService,
    public router: Router,
    public DIALOGREF: MatDialogRef<Pushpop>,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(data)
    const datas = [];
    datas.push(data);
    // console.log(datas)
    // this.changeType = datas[0].changeType;
    this.matchId = datas[0].matchId;
    // this.bowler = datas[0].bowler;
    this.inning = datas[0].innings;
    // this.batsman1 = datas[0].batsman1;
    // this.batsman2 = datas[0].batsman2;
    this.secondmsg = datas[0].secondmsg,
      this.firstmsg = datas[0].firstmsg,
      this.team1_score = datas[0].team1_score,
      this.team1_over = datas[0].team1_over,
      this.team1_wicket = datas[0].team1_wicket
  }
  ngOnInit() {

    this.send();
  }

  send() {
    // this.overmatchs = [];test2 needs 17 runs in 60 balls
    // this.overmatchs = []; Ramco Millennium Fighters is playing40: 4/0 Over: 0.3
    this.liveScoreData = [];
    this.servicesService.sendAndroidPush(this.message)
      .subscribe(
        (        data: any) => {
          // console.log(this.secondmsg);
          // console.log(this.inning);
          //  this.message=this.secondmsg;
          if (this.inning === '1') {
            this.message = this.secondmsg + this.space + this.coln + this.space + this.team1_score + this.slash + this.team1_wicket + this.space + this.over + this.coln + this.space + this.team1_over;
          } else {
            this.message = this.firstmsg;
            this.team1_score = this.team1_score;
            this.team1_over = this.team1_over;
            this.team1_wicket = this.team1_wicket;
            // this.router.navigate(['/scoreboard',{  'matchId': this.matchId }]);
          }

        });

  }
  onCancelClick() {
    this.DIALOGREF.close({});
  }
}
