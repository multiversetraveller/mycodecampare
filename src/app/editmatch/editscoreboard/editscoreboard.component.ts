import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewExampleDialog, NoBallDialog, SelectPlayerDialog } from '../../selectmatch/scoreboard/scoreboard.component';
import { ApiservicesService } from 'src/app/apiservices.service';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-editscoreboard',
  templateUrl: './editscoreboard.component.html',
  styleUrls: ['./editscoreboard.component.css']
})
export class EditscoreboardComponent implements OnInit {
  refreshs = faRefresh;
  public scoreBtnHeight: any;
  public scoreBtnHeight2: any;
  public wideText = 'WIDE';
  public byeText = 'BYE';
  public lbText = 'LB';
  public singleText: any = 0;
  public animal!: string;
  public name!: string;
  public matchId: any;
  public liveScoreData: any;
  public nextBall: any;
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
  public wickets = {};
  public singleValOldforsix = 0;
  public isLoaderShow = false;
  public fromWhich = '';
  public bowlEdited = false;
  public editedScoreId: any;
  public editedWicketType = '';
  public editedOver = '';
  public editedInning = '';
  public editedOverBall: any;
  public sixText: any = 0;
  public fourText: any = 0;
  public team1: any;
  public team2: any;
  public hide!:true;
  public hide1!:true;
  public runs : any = 0;
  bgcolrsefnb!: string;
  bgcolrseffsix!: string;
  bgcolrsefffour!: string;
  bgcolrsefrun!: string;
  bgcolrsefwd!: string;
  bgcolrseflb!: string;
  bgcolrsefbye!: string;
  bgcolrsefextra!: string;
  bgcolrseff!: string;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private servicesService: ApiservicesService) {
    this.scoreBtnHeight = (window.innerHeight - 395) / 5 + 'px';
    this.scoreBtnHeight2 = (window.innerHeight - 430) / 5 + 'px';

  }

  /**
   * Call function on page load
   */
  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.editedOver = this.route.snapshot.params['over'];
    this.editedInning = this.route.snapshot.params['inning'];
    this.getLiveScore();
    this.getOverData();
  }

  /**
   * Get Over Balls
   */
  getOverData() {
    this.isLoaderShow = true;
    this.servicesService.getBallsByOver(this.matchId, this.editedOver, this.editedInning).subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.editedOverBall = data['overball'];
        // console.log(this.editedOverBall);
        this.changeBowler(this.editedOverBall[0].bowler_id);
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.servicesService.openSnackBar('Error During Fetch Over Bowls', 'Close');
      }
    );
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
    if (!this.editedScoreId) {
      this.isLoaderShow = true;
      this.bowlEdited = false;
    }
    this.liveScoreData = [];
    this.servicesService.getLiveScore(this.matchId).subscribe(
      (      data: any) => {
        this.liveScoreData.push(data);
        this.liveScoreData = this.liveScoreData[0];
        this.team1 = this.liveScoreData.team1_id;
        this.team2 = this.liveScoreData.team2_id;
        console.log(this.team1)
        if (!this.editedScoreId) {
          if (this.liveScoreData.innings === '1') {
            this.nextBall = (Number(this.liveScoreData.team1_over) + 0.1).toFixed(1);
          } else {
            this.nextBall = (Number(this.liveScoreData.team2_over) + 0.1).toFixed(1);
          }
        }
        this.isLoaderShow = false;
      });
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
    this.bgcolrsefrun='#cccccc';
    this.singleValOld = val;
    this.totalRun = this.totalRun + val;
  }

  /**
   * call when wide change
   * @param val val
   */
  wideChange(val:any) {
    this.resetAllVal();
    const VALUE = val + 1;
    this.totalRun = this.totalRun - this.oldWideVal;
    this.totalExtra = this.totalExtra - this.oldWideVal;
    this.wideText = `WD+${val}`;
    this.bgcolrsefwd='#cccccc';
    this.oldWideVal = VALUE;
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }

  /**
   * call when bye change
   * @param val val
   */
  byeChange(val:any) {
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
  lbChange(val:any) {
    this.resetAllVal();
    const VALUE = val + 0;
    this.totalRun = this.totalRun - this.oldLbVal;
    this.totalExtra = this.totalExtra - this.oldLbVal;
    this.lbText = `LB + ${val}`;
    this.oldLbVal = VALUE;
    this.totalRun = this.totalRun + VALUE;
    this.totalExtra = this.totalExtra + VALUE;
  }
  
   fourchange(val: any){
    this.resetAllVal();
    this.totalRun = this.totalRun - this.singleValOldforsix;
    this.fourText=val;
    this.sixText=0;
    this.bgcolrsefffour='#cccccc';
    this.singleValOldforsix = val;
    this.totalRun = parseInt(this.totalRun) + parseInt(val);
  }

  sixChange(val: any){
    this.resetAllVal();
    this.totalRun = this.totalRun - this.singleValOldforsix;
    this.sixText=val;
    this.fourText=0;
    this.bgcolrseffsix='#cccccc';
    this.singleValOldforsix = val;
    this.totalRun = parseInt(this.totalRun) + parseInt(val);
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
        innings: this.editedInning,
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
        this.bgcolrseff = '#cccccc';

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

    DIALOGREF.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.addNoBall(result.nbrun, result.fromwhich);
        this.bgcolrsefnb = '#cccccc';

      }
    });
  }

  /**
   * Open change batsman or bowler dialog
   * @param type type
   */
  openSelectPlayerDialog(type: any) {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(SelectPlayerDialog, {
      width: '320px',
      autoFocus: false,
      data: {
        changeType: type,
        matchId: this.matchId,
        batsman1: this.liveScoreData.bastman1_id,
        batsman2: this.liveScoreData.bastman2_id,
        bowler: this.liveScoreData.bowler_id,
        inning: this.editedInning
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
    const wides = this.checkWide();
    const noBalls = this.checkNoBall();
    const byes = this.checkByes();
    const legByes = this.checkLegByes();
    const inningWise = this.setInningWiseData();
    const editScore = this.checkBowlEdited();
    const data = {
      'hdninning': this.editedInning,
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
    //  'extra': this.extraInputOld,

      'total_extra': this.totalExtra,
      'total_run': this.totalRun,
      'series': window.localStorage.getItem('selectedSeries')
    };
    console.log(data);
    if (isValidate) {
      this.isLoaderShow = true;
      if (addType === 'save') {
        this.servicesService.addScore(data).subscribe(
          (          // tslint:disable-next-line: no-shadowed-variable
          data: any) => {
            this.getLiveScore();
            this.resetAllVal();
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
            this.getOverData();
            this.resetAllVal();
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
    if (this.liveScoreData.bowler_id === '' || this.liveScoreData.bowler_id === 0) {
      this.servicesService.openSnackBar('Please Select Bowler', 'Close');
      return false;
    } else if (this.liveScoreData.bastman1_id === '' || this.liveScoreData.bastman1_id === 0) {
      this.servicesService.openSnackBar('Please Select Batsman1', 'Close');
      return false;
    } else if (this.liveScoreData.bastman2_id === '' || this.liveScoreData.bastman2_id === 0) {
      this.servicesService.openSnackBar('Please Select Batsman2', 'Close');
      return false;
    } else if (this.liveScoreData.strike === '' || this.liveScoreData.strike === 0) {
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
    if (this.editedInning === '1') {
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
    checkbatforsixruns(){
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
    this.wideText = 'WD';
    this.byeText = 'BYE';
    this.lbText = 'LB';
    this.singleText = 0;
    this.fourText=0;
    this.sixText=0;
    this.totalExtra = 0;
    this.totalRun = 0;
    this.runs = 0;
    this.extra = 0;
    this.oldWideVal = 0;
    this.oldByeVal = 0;
    this.oldLbVal = 0;
    this.extraInputOld = 0;
    this.singleValOld = 0;
    this.singleValOldforsix=0;
    this.noBallText = 'NB';
    this.noBallRun = 0;
    this.wickets = {};
    this.fromWhich = '';
    this.bgcolrseff ='';
    this.bgcolrsefffour='';
    this.bgcolrseffsix='';
    this.bgcolrsefnb='';
    this.bgcolrsefrun='';
    this.bgcolrsefwd='';
    this.bgcolrseflb='';
    this.bgcolrsefbye='';
    this.bgcolrsefextra=''
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
        data => {
          this.getLiveScore();
        },
        error => {
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

  /**
   * Edit score api call
   * @param scoreId scoreId
   */
  editScore(scoreId: any) {
    this.hide=true;
    this.hide1=true;
    this.isLoaderShow = true;
    this.editedScoreId = scoreId;
    this.servicesService.editScore(scoreId, this.matchId).subscribe(
      (      data: any) => {
        // this.isLoaderShow = false;
        this.bowlEdited = true;
        this.nextBall = `${data['over']}`;
        this.changeBatsman(data['batsman_id']);
        this.changeStrike(data['batsman_id']);
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
        }else if (data['4s1'] > 0) {
          this.singleText = 4;
        }
         else if (data['4s'] > 0) {
          this.singleText = 4;
        } else if (data['5s1'] > 0) {
          this.singleText = 5;
        } else if (data['6s'] > 0) {
          this.singleText = 6;
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

  /**
   * call api for change bowler
   */
  changeBowler(bowlerId: any) {
    this.servicesService.changeBowler(bowlerId, this.matchId).subscribe(
      (      data: any) => {
        this.getLiveScore();
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Change Bowler', 'Close');
      }
    );
  }

   /**
   * call api for change batsman
   * @param position position
   */
  changeBatsman(batsmanId: any) {
    this.servicesService.changeBatsman(batsmanId, this.matchId, 1).subscribe(
      (      data: any) => {
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Change Bowler', 'Close');
      }
    );
  }

  deleteBowl(scoreId: any) {
    this.servicesService.deleteBowl(scoreId).subscribe(
      (      data: any) => {
        this.getLiveScore();
        this.getOverData();
      },
      (      error: any) => {
        this.servicesService.openSnackBar('Error While Delete Bowl', 'Close');
      }
    );
  }

  goEditScore() {
    this.router.navigate(['/editovers', { 'matchId': this.matchId }], {skipLocationChange: true});
  }

  goEditWicket() {
    this.router.navigate(['/editwicket', { 'matchId': this.matchId, 'team1': this.team1, 'team2': this.team2, 'innings':this.editedInning}], {skipLocationChange: true});
  }

}
