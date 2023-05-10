import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ApiservicesService } from 'src/app/apiservices.service';
import { LivescoreService } from 'src/app/livescore.service';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  batsman2: string;
  batsman1: string;
  inning: string;
  bowler: string;
  team1Id: string;
  team2Id: string;
  matchId: any;
  innings: any;
  wicketType: any;
  batsman2Id: any;
  batsman1Id: any;
  bowlEdited: any;
  nextBall: any;
  bowlerId: any;
  striker: any;
  changeType: string;
  animal: string;
  name: string;

  
}

@Component({
  selector: 'app-scoreboard',
  templateUrl: './editscorecard.component.html',
  styleUrls: ['./editscorecard.component.css']
})
export class EditscorecardComponent implements OnInit {

  public scoreBtnHeight: any;
  public scoreBtnHeight2: any;

  public wideText = 'WIDE';
  public byeText = 'BYE';
  public lbText = 'LB';
  public singleText :any = 0;
  public animal!: string;
  public name!: string;
  public matchId: any;
  public liveScoreData: any;
  public liveScoreDa: any;
  public sixText: any = 0;
  public fourText: any = 0;

  public messages: string[] = [];
  public jsonarray:any;
  public mtype1: any;
  public nextBall: any;
  public singleValOldforsix = 0;
  public totalRunforsix : any = 0;
  public runs : any = 0;
  public totalExtra = 0;
  public totalRun :any = 0;
  public extra = 0;
  public oldWideVal = 0;
  public oldByeVal = 0;
  public oldLbVal = 0;
  public extraInputOld = 0;
  public singleValOld = 0;
  public noBallText = 'NB';
  public noBallRun = 0;
  public matchseries1: any;
  public wickets = {};
  public isLoaderShow = false;
  public fromWhich = '';
  public bowlEdited = false;
  public editedScoreId: any;
  public editedWicketType = '';
  public liveScor: any;
 public overnoo :any;
  public editbowl = false;
  public editbowl1 = true;



  team1: any;
  team2: any;
  geresult !: any
  bgcolrsefffour!: string;
  bgcolrseffsix!: string;
  bgcolrseff!: string;
  bgcolrsefnb!: string;
  bgcolrsefrun!: any;
  bgcolrsefextra!: string;
  bgcolrsefbye!: string;
  bgcolrsefwd!: string;
  bgcolrseflb!: string;
  refreshs = faRefresh;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private servicesService: ApiservicesService, private liveservice: LivescoreService) {
    this.scoreBtnHeight = (window.innerHeight - 343) / 5 + 'px';
    this.scoreBtnHeight2 = (window.innerHeight - 400) / 5 + 'px';

  }

  /**
   * Call function on page load
   */
  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.getLiveScore();
    // this.liveservice.getMessages().subscribe((message: string) => {
    //   this.messages.push(message);
    // });
  }
  // sendMessage(message,jsonarray) {
  //   this.matchseries1 = localStorage.getItem('selectedSeries');
  //   this.mtype1 = window.localStorage.getItem('tourType');
  //   this.jsonarray = {
  //     "col1":{"matchseries1":this.matchseries1 , "mtype1": this.mtype1}
  //     }
  //   console.log(_.cloneDeep(message, jsonarray));
  //   setTimeout(() => {
  //     this.liveservice.sendMessage(message,  this.jsonarray);
  //   }, 500);
  // }
  /**
   * Refresh Score
   */
  refresh() {
    this.getLiveScore();
  }

   /**
   * Refresh Score
   */
  gocorecard(){
    this.router.navigate(['/scoreboard',{ 'matchId': this.matchId}]);
  }

 
  /**
   * Call API For get live score
   */
  getLiveScore() {
    this.bowlEdited = false;
    this.isLoaderShow = true;
    this.liveScoreData = [];
    this.servicesService.getLiveScore(this.matchId).subscribe(
      (      data: any) => {
        this.liveScoreData.push(data);
        this.liveScoreData = this.liveScoreData[0];
        this.team1 = this.liveScoreData.team1_id;
        this.team2 = this.liveScoreData.team2_id;
        console.log(this.liveScoreData.overball)
        if (this.liveScoreData.innings === '1') {
          // this.nextBall = (Number(this.liveScoreData.team1_over) + 0.1).toFixed(1);
          this.nextBall ='';
        } else {
          // this.nextBall = (Number(this.liveScoreData.team2_over) + 0.1).toFixed(1);
          this.nextBall ='';
        }
        this.isLoaderShow = false;
      });
  }
  goEditWicket(teaminn: any) {
    console.log(teaminn)
    this.router.navigate(['/editwicket2', { 'matchId': this.matchId, 'team1': this.team1, 'team2': this.team2, 'teaminn': teaminn}], {skipLocationChange: true});
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
    this.totalRun = this.totalRun + val;
    this.totalExtra = this.totalExtra + val;
  }

  /**
   * Call when change bat run
   * @param val val
   */
  singleChange(val:  any) {
    this.totalRun = this.totalRun - this.singleValOld;
    this.singleText = val;
    this.singleValOld = val;
    this.bgcolrsefrun='#cccccc';
    this.totalRun = parseInt(this.totalRun)  + parseInt(val);
  }

  fourchange(val:  any){
    this.resetAllVal();
    this.totalRunforsix = this.totalRunforsix - this.singleValOldforsix;
    this.fourText=val;
    this.sixText=0;
    this.singleValOldforsix = val;
    this.bgcolrsefffour='#cccccc';
    this.totalRunforsix = parseInt(this.totalRunforsix) + parseInt(val);
  }

  sixChange(val: any){    
    this.resetAllVal();
    this.totalRunforsix = this.totalRunforsix - this.singleValOldforsix;
    this.sixText=val;
    this.fourText=0;
    this.singleValOldforsix = val;
    this.bgcolrseffsix='#cccccc';

    this.totalRunforsix = parseInt(this.totalRunforsix) + parseInt(val);
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
    this.oldWideVal = VALUE;
    this.bgcolrsefwd='#cccccc';
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }

  /**
   * call when bye change
   * @param val val
   */
  byeChange(val: any) {
    this.resetAllVal();
    const VALUE = val + 0;
    this.totalRun = this.totalRun - this.oldByeVal;
    this.totalExtra = this.totalExtra - this.oldByeVal;
    this.byeText = `BYE+${val}`;
    this.bgcolrsefbye='#cccccc';
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
    this.bgcolrseflb='#cccccc';
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
    const DIALOGREF = this.dialog.open(DialogOverviewExampleDialogs, {
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

    DIALOGREF.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.wickets = result;
      }
    });
  }
 /**
   * editscore-card
   */


  /**
   * Open no ball dialog
   */
  openNoBallDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(NoBallDialogs, {
      width: '320px',
      autoFocus: false
    });

    DIALOGREF.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.addNoBall(result.nbrun, result.fromwhich);
      }
    });
  }

  editScorecard(): void{
    const DIALOGREF = this.dialog.open(DialogEditscorecards, {
      width: '520px',
      height:'400px',
      data:{
        matchId: this.matchId,
        innings: this.liveScoreData.innings
      }
    });
    
    DIALOGREF.afterClosed().subscribe(result => {
      // if (result === 'yes') {

      // console.log(`Dialog result: ${JSON.stringify(result)}`);
   
      this.liveScor = result;
      // console.log(this.liveScor);
      this.liveScoreData = this.liveScor;

      // console.log(this.liveScor.innings);
      window.localStorage.setItem('inningsloc',this.liveScor.innings);
  
      // }
    });
  }

  /**
   * Open change batsman or bowler dialog
   * @param type type
   */
  openSelectPlayerDialog(type: any) {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(SelectPlayerDialogs, {
      width: '320px',
      autoFocus: false,
      data: {
        changeType: type,
        matchId: this.matchId,
        batsman1: this.liveScoreData.bastman1_id,
        batsman2: this.liveScoreData.bastman2_id,
        bowler: this.liveScoreData.bowler_id,
        inning: this.liveScoreData.innings
      }
    });

    DIALOGREF.afterClosed().subscribe(result => {
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
    const singlefoursix =this.checkbatforsixruns();
    this.runs = this.totalRun+this.totalRunforsix;
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
      'chk_batsman': this.liveScoreDa.strikes,
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
      'total_run': this.runs,
      'series': window.localStorage.getItem('selectedSeries')
    };
    // console.log(data);
    this.geresult=data;
    var gets = this.geresult.score_id;
    var getsov = this.geresult.over;
    // console.log(gets);

    if (isValidate) {
      this.isLoaderShow = true;
      if (addType === 'save') {
        this.servicesService.addScore(data).subscribe(
          (          // tslint:disable-next-line: no-shadowed-variable
          data: any) => {

           // this.getLiveScore();
           this.getoveralldata();
            this.resetAllVal();
            // this.sendMessage(this.geresult, this.jsonarray);
            this.isLoaderShow = false;
            this.totalRun = '';
            this.totalRunforsix = '';
          },
          (          error: any) => {
            this.servicesService.openSnackBar('Error while adding score', 'Close');
            this.isLoaderShow = false;
          });
      } else {
        this.editbowl1=true;
        this.editbowl=false;
        this.servicesService.updateSingleBowl_past(data).subscribe(
          (          // tslint:disable-next-line: no-shadowed-variable
          data: any) => {
            // console.log(data,'--1');
           
            // this.getLiveScore();
            this.getoveralldata();
            this.resetAllVal();

            if(getsov == 0.6){
              var getss= parseInt(gets) + 0;
              // console.log(getss);
           this.editScore(getss);
            }else{
              var getss= parseInt(gets) + 1;
              // console.log(getss);
              this.editScore(getss);
            }
            
            // this.resetAllVal();
            this.isLoaderShow = false;

          },
          (          error: any) => {
            this.servicesService.openSnackBar('Error while adding score', 'Close');
            this.isLoaderShow = false;
          });
      }
    }
  }
  getoveralldata() {
   
          this.liveScoreData =[];
          var overno:any = window.localStorage.getItem('overno');
         var inn =  window.localStorage.getItem('inningsloc');
        //  console.log(inn)
          this.servicesService.editScorecard(this.matchId,inn,overno)
          .subscribe(
            (            data: any) => {
              this.liveScoreData.push(data);
              this.liveScoreData = this.liveScoreData[0];

            //  console.log(this.liveScoreData)
              
            });
    }
      
  
  /**
   * Check bowl edited or not
   */
  checkBowlEdited() {
    if (this.editScore!) {
      return {'score_id': this.editedScoreId};
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
    } 
    // else if (this.liveScoreData.bastman2_id === '' || this.liveScoreData.bastman2_id === 0 || this.liveScoreData.bastman2_id === undefined) {
    //   this.servicesService.openSnackBar('Please Select Batsman', 'Close');
    //   return false;
    // }
     else if (this.liveScoreDa.strikes === '' || this.liveScoreDa.strikes === 0 || this.liveScoreDa.strikes === undefined) {
      this.servicesService.openSnackBar('Please Select Striker', 'Close');
      return false;
    }else if (this.liveScoreDa.batsman_id !== this.liveScoreDa.strikes ) {
      this.servicesService.openSnackBar('Please Select Striker1', 'Close');
      return false;
    } 
    else {
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
  checkbatforsixruns(){
    if (this.fourText === 4) {
        return { '4s': 'on' };
      }
      if (this.sixText === 6) {
        return { '6s': 'on' };
      }
  }
  /**
   * check run from bat
   */
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
      if (this.singleText === "6") {
        return { '6s1': 'on' };
      }
      if (this.singleText === "4") {
        return { '4s1': 'on' };
      }
    } else if (this.fromWhich === 'bat') {
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
    this.wideText = 'WIDE';
    this.byeText = 'BYE';
    this.lbText = 'LB';
    this.singleText = 0;
    this.totalExtra = 0;
    this.totalRun = 0;
    this.runs = 0;
    this.extra = 0;
    this.oldWideVal = 0;
    this.oldByeVal = 0;
    this.oldLbVal = 0;
    this.extraInputOld = 0;
    this.singleValOld = 0;
    this.noBallText = 'NB';
    this.noBallRun = 0;
    this.wickets = {};
    this.fromWhich = '';
    this.sixText=0;
    this.fourText=0;
    this.bgcolrseff ='';
    this.bgcolrsefffour='';
    this.bgcolrseffsix='';
    this.bgcolrsefnb='';
    this.bgcolrsefrun='';
    this.bgcolrsefwd='';
    this.bgcolrseflb='';
    this.bgcolrsefbye='';
    this.bgcolrsefextra=''

    this.singleValOldforsix=0;
  }

  /**
   * Call API of change strike of batsman
   * @param playerId playerId
   */
  changeStrike(playerId: any) {
    this.servicesService.changeStrike(playerId, this.matchId).subscribe(
      (      // tslint:disable-next-line: no-shadowed-variable
      data: any) => {
     //   this.getLiveScore();
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
      }]);
    }
  }
  clearss(){
    this.nextBall='';
  }
  /**
   * Edit score api call
   * @param scoreId scoreId
   */
  editScore(scoreId: number) {
    this.resetAllVal();
    this.isLoaderShow = true;
    this.editedScoreId = scoreId;
    this.liveScoreDa=[];
    this.servicesService.editScore(scoreId, this.matchId).subscribe(
      (data:any) => {
        // console.log(data)
        this.isLoaderShow = false;
        this.bowlEdited = true;
        this.editbowl1=false;
        this.editbowl=true;
        this.liveScoreDa.push(data);
        this.liveScoreDa = this.liveScoreDa[0];
        this.nextBall = `${data['over']}`;
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
        } else if (data['4s'] > 0) {
          this.fourText = 4;
        } else if (data['5s'] > 0) {
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
          this.wideText = 'WIDE';
        }
        if (data['b'] > 0) {
          this.byeChange(data['b'] - 1);
        } else {
          this.byeText = 'BYE';
        }
        if (data['lb'] > 0) {
          this.lbChange(data['lb'] - 1);
        } else {
          this.lbText = 'BYE';
        }
        if(data['extra']>0){
          this.extra = data['extra'];
        }
        else{
          this.extra = 0;
        }
        if (data['total_run'] > 0) {
          this.totalRun = data['total_run'];
        } else {
          this.totalRun = 0;
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
    const buttonClicked = confirm('Are You Want To Sure Delete This Ball');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
    this.servicesService.deleteBowl(scoreId).subscribe(
      (      data: any) => {
        // console.log(data);
          this.isLoaderShow = false;
          this.servicesService.openSnackBar('Ball Delete Successfully', 'Close');
           this.getLiveScore();
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
      }
    );}
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialogs',
  templateUrl: 'dialog-overview-example-dialogs.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogOverviewExampleDialogs {
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
  constructor(
    public servicesService: ApiservicesService,
    public DIALOGREF: MatDialogRef<DialogOverviewExampleDialogs>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    const datas = [];
    datas.push(data);
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
  getPlayers(id: any) {
    this.servicesService.getPlayersByTeam(id).subscribe(
      (data:any) => {
        this.bowlingPlayers = data;
        this.bowlingPlayers = this.bowlingPlayers.data;
      });
  }

  /**
   * Get players by team
   */
  getPlayersBatting() {
    this.servicesService.getChangeBatsman(this.matchId, this.batsman1Id, this.batsman2Id, this.inning).subscribe(
      (data:any) => {
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
  selector: 'noball-dialogs',
  templateUrl: 'noball-dialogs.html',
  styleUrls: ['./editscorecard.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NoBallDialogs {
  nbTxtRun = 0;
  nbRun = 0;
  nbRadio = '';
  nbruns: any = 1;

  constructor(
    public DIALOGREF: MatDialogRef<NoBallDialogs>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  /**
   * call when input value change from no ball dialog
   */
  countNbScore(nbruntxt: number) {
    this.nbRun = nbruntxt;
  }

  /**
   * Call when click on ok in no ball dialog
   */
  onOkClick(): void {
    const TOTALNB = this.nbRun + 1;
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
  selector: 'select-player-dialogs',
  templateUrl: 'select-player-dialogs.html',
  styleUrls: ['./editscorecard.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class SelectPlayerDialogs {
  changeType = '';
  type = 'Player';
  teamId = '';
  bowler = '';
  inning = '';
  batsman1 = '';
  batsman2 = '';
  playersTeam:any = [];
  outedPlayers:any = [];
  matchId = '';
  selectedPlayer = '';
  constructor(
    public servicesService: ApiservicesService,
    public DIALOGREF: MatDialogRef<SelectPlayerDialogs>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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
    this.servicesService.getChangeBatsman(this.matchId, this.batsman1, this.batsman2, this.inning)
      .subscribe(
        (        data: any) => {
          this.playersTeam.push(data);
          this.outedPlayers = this.playersTeam[0].wdata;
          this.playersTeam = this.playersTeam[0].data;
        });
  }

  /**
   * Call when click on ok button in change player dialog
   */
  onOkClick(): void {
    if (this.selectedPlayer !== '') {
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

  /**
   * call api for change batsman
   * @param position position
   */
  changeBatsman(position: number) {
    this.servicesService.changeBatsman(this.selectedPlayer, this.matchId, position).subscribe(
      (      data: any) => {
        this.DIALOGREF.close('yes');
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
  selector: 'dialog-editscorecards',
  templateUrl: 'dialog-editscorecards.html',
  styleUrls: ['./editscorecard.component.css']
})
export class DialogEditscorecards{
  panelOpenState = false;
  changeType='';
  bowler: any;
  matchId!: any;
  inning!: any;
  batsman1: any;
  batsman2: any;
  overmatch:any = [];
  overmatchs : any;

  totalrun: any;
  totalrun_inning1: any;
  totalwicket_inning1: any;
  inning1_over: any;
  overwiseballs = [];
  liveScoreData : any;
  overmatchresults: any;
  nextBall!: string;
  result: any;
  inning1_overs: any;
  inning2_overs: any;
  total_team1over: any;
  total_team2over: any;
  public overnoo: any;

  constructor(
    public servicesService: ApiservicesService,
    public DIALOGREF: MatDialogRef<DialogEditscorecards>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
    {
      // console.log(data)
      const datas = [];
      datas.push(data);
      // console.log(datas)
      this.matchId = datas[0].matchId;
      this.inning = datas[0].innings;
      // console.log(this.inning + '----------inning ----- check')
    
    }
    ngOnInit()
    {
      this.getoverdata();
    }
    
getoverdata() {
  this.overmatchs = [];
  this.overmatchs = [];
  this.servicesService.getalloverdata(this.matchId,this.inning)
    .subscribe(
      (      data: any) => {
        this.overmatch.push(data);
        this.overmatchs.push(data);

        this.totalrun_inning1 = this.overmatch[0].total_total_run;
        this.totalwicket_inning1 = this.overmatch[0].total_wicket;
        // console.log(this.totalrun_inning1 ,  this.totalwicket_inning1)

        this.overmatch = this.overmatch[0].data;
        // console.log(this.overmatch);
        
        this.inning1_over = this.overmatch[0].over;
        this.inning1_overs = this.overmatchs[0].team1ar;
        this.inning2_overs = this.overmatchs[0].team2ar;
        // console.log(this.inning1_overs);


        this.overwiseballs = this.overmatch[0].data;

        this.overmatchs = this.overmatchs[0];
        
        // console.log(this.overmatchs.team1_over)
        this.total_team1over = this.overmatchs.team1_over;
        this.total_team2over = this.overmatchs.team2_over;

      });
}
  deleteallover(over: number,inn: any){
    var overs= over + 1;
    // console.log(overs)
    this.servicesService.deleteallover(overs,this.matchId,this.inning).subscribe(
      (       data: any) => {
        this.DIALOGREF.close('yes');
        this.editover(overs,inn);
       },
      (       error: any) => {
        this.servicesService.openSnackBar('Error While Deleting Over', 'Close');
      }
    )
    //this.getLiveScore();
  }

  editover(over: any,inn: any) : void{
    this.liveScoreData =[];
    this.overnoo = over;
    window.localStorage.setItem('overno',over);
    this.servicesService.editScorecard(this.matchId,inn,this.overnoo)
    .subscribe(
      (      data: any) => {
        this.liveScoreData.push(data);
        this.liveScoreData = this.liveScoreData[0];

      //  console.log(this.liveScoreData)
        
       this.DIALOGREF.close(this.liveScoreData);
      });
  }

}