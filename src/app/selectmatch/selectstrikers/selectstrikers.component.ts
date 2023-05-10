import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-selectstrikers',
  templateUrl: './selectstrikers.component.html',
  styleUrls: ['./selectstrikers.component.css']
})
export class SelectstrikersComponent implements OnInit {
  players: any[] = [];
  onlyListBatting: any[] = [];
  onlyListBowling: any[] = [];
  matchId = '';
  firstSelectedPlayer = '';
  secondSelectedPlayer = '';
  battingTeamName = '';
  bowlingTeamName = '';
  chk_team1: any;
  chk_team2: any;
  inning = 1;
  selectedStriker: any;
  selectedNonStriker: any;
  selectedBowler: any;
  constructor(
    public router: Router,
    private servicesService: ApiservicesService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.getPlayers();
    this.getMatchDataById();
    this.getLiveScore();
  }

  getPlayers() {
    this.servicesService.selectTossPlayer(this.matchId)
      .subscribe(
        (        data: any) => {
          this.players.push(data);
          this.onlyListBatting = this.players[0].team1_player;
          this.onlyListBowling = this.players[0].team2_player;
          this.battingTeamName = this.players[0].team1;
          this.bowlingTeamName = this.players[0].team2;
        });
  }

  firstPlayer(playerId: string) {
    this.firstSelectedPlayer = playerId;
  }

  secondPlayer(playerId: string) {
    this.secondSelectedPlayer = playerId;
  }

  getMatchDataById() {
    this.servicesService.getMatchDataById(this.matchId).subscribe(
      data => {
        console.log(data);
      });
  }

  goScoreBoard() {
    // if (this.selectedStriker === '' || this.selectedStriker == null || this.selectedStriker === undefined) {
    //   this.servicesService.openSnackBar('Please Select Striker', 'Close');
    // } else if (this.selectedNonStriker === '' || this.selectedNonStriker == null || this.selectedNonStriker === undefined) {
    //   this.servicesService.openSnackBar('Please Select Non Striker', 'Close');
    // } else if (this.selectedBowler === '' || this.selectedBowler == null || this.selectedBowler === undefined) {
    //   this.servicesService.openSnackBar('Please Select Bowler', 'Close');
    // } else {
      this.chk_team1 = '' + this.selectedStriker + ',' + this.selectedNonStriker + '';
      this.chk_team2 = this.selectedBowler;
      this.servicesService.selectStrikers(this.matchId, this.chk_team1, this.chk_team2, this.inning)
      .subscribe(
        (        data: any) => {
          this.router.navigate(['/scoreboard', { 'matchId': this.matchId }], {skipLocationChange: true});
        });
    // }
  }

  /**
   * Call API For get live score
   */
  getLiveScore() {
    this.servicesService.getLiveScore(this.matchId).subscribe(
      (data:any) => {
        this.selectedStriker = data['bastman1_id'];
        this.selectedNonStriker = data['bastman2_id'];
        this.selectedBowler = data['bowler_id'];
      });
  }
}
