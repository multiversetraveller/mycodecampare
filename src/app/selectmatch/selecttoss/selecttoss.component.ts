import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../apiservices.service';

@Component({
  selector: 'app-selecttoss',
  templateUrl: './selecttoss.component.html',
  styleUrls: ['./selecttoss.component.css']
})
export class SelecttossComponent implements OnInit {
  team1Name = window.localStorage.getItem('team1Name');
  team2Name = window.localStorage.getItem('team2Name');
  team1Image = window.localStorage.getItem('team1Image');
  team2Image = window.localStorage.getItem('team2Image');
  tossWin = '';
  electTo = '';
  matchId = '';
  team1Checked = false;
  team2Checked = false;
  batChecked = false;
  bowlChecked = false;
  matchStat: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private servicesService: ApiservicesService) { }

  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.matchStat = this.route.snapshot.params['matchStat'];
    this.getMatchDataById();
  }

  wonTossByTeam1(event: { value: string; }) {
    this.tossWin = event.value;
  }

  electedTo(event: { value: string; }) {
    this.electTo = event.value;
  }

  goSelectStrikers() {
    if (this.tossWin === '' || this.tossWin == null || this.tossWin === undefined) {
      this.servicesService.openSnackBar('Please Select Who Won the toss', 'Close');
    } else if (this.electTo === '' || this.electTo == null || this.electTo === undefined) {
      this.servicesService.openSnackBar('Please Select what is elected', 'Close');
    } else {
      this.servicesService.selectToss(this.matchId, this.tossWin, this.electTo)
        .subscribe(
          (          data: any) => {
            this.router.navigate(['/selectstrikers', { 'matchId': this.matchId }], {skipLocationChange: true});
          });
    }
  }

  getMatchDataById() {
    this.servicesService.getMatchDataById(this.matchId).subscribe(
      (      data:any) => {
        this.tossWin = data['toss_win'];
        this.electTo = data['elect_to'];
        if (data['toss_win'] === this.team1Name) {
          this.team1Checked = true;
        } else if (data['toss_win'] === this.team2Name) {
          this.team2Checked = true;
        }
        if (data['elect_to'] === 'bat') {
          this.batChecked = true;
        } else if (data['elect_to'] === 'field') {
          this.bowlChecked = true;
        }
      });
  }

  goScoreboard() {
    this.router.navigate(['/scoreboard', { 'matchId': this.matchId }], {skipLocationChange: true});
  }
}

