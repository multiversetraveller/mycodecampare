import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-editselectplayer',
  templateUrl: './editselectplayer.component.html',
  styleUrls: ['./editselectplayer.component.css']
})
export class EditselectplayerComponent implements OnInit {
  playersTeam1: any[] = [];
  playersTeam2: any[] = [];
  onlyListTeam1: any[] = [];
  onlyListTeam2: any[] = [];
  isLoading = true;
  matchId = '';
  team1Id = '';
  team2Id = '';
  selectedPlayersTeam1: any[] = [];
  selectedPlayersTeam2: any[] = [];
  team1Name = window.localStorage.getItem('team1Name');
  team2Name = window.localStorage.getItem('team2Name');
  team1String = '';
  team2String = '';
  selectedAllTeam1 = false;
  selectedAllTeam2 = false;
  isAllPlayersSelected1 = false;
  isAllPlayersSelected2 = false;
  matchStat: any;
  constructor(private servicesService: ApiservicesService,
    public route: ActivatedRoute,
    public router: Router) {
    this.matchId = this.route.snapshot.params['matchId'];
    this.team1Id = this.route.snapshot.params['team1Id'];
    this.team2Id = this.route.snapshot.params['team2Id'];
    window.localStorage.setItem('team1',this.team1Id)
    window.localStorage.setItem('team2',this.team2Id)
  }

  ngOnInit() {
    this.getPlayersByTeam1(this.team1Id);
    this.getPlayersByTeam2(this.team2Id);
  }

  getPlayersByTeam1(id: string) {
    this.isLoading = true;
    this.servicesService.getPlayersByTeam(id)
      .subscribe(
        data => {
          const players = [];
          const sel = { isSelected: false };
          this.playersTeam1.push(data);
          for (const item of this.playersTeam1[0].data) {
            players.push({
              ...item,
              ...sel
            });
          }
          this.onlyListTeam1 = players;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        });
  }

  getPlayersByTeam2(id: string) {
    this.isLoading = true;
    this.servicesService.getPlayersByTeam(id)
      .subscribe(
        data => {
          const players = [];
          const sel = { isSelected: false };
          this.playersTeam2.push(data);
          for (const item of this.playersTeam2[0].data) {
            players.push({
              ...item,
              ...sel
            });
          }
          this.onlyListTeam2 = players;
          this.isLoading = false;
          this.getMatchDataById();
        },
        error => {
          this.isLoading = false;
        });
  }

  getMatchDataById() {
    this.isLoading = true;
    this.servicesService.getMatchDataById(this.matchId)
      .subscribe(
        (data:any) => {
          this.isLoading = false;
          let players1 = data['team1_player'];
          players1 = players1.split(',');
          let players2 = data['team2_player'];
          players2 = players2.split(',');
          for (const item of players1) {
            this.selectedPlayersTeam1.push(item);
            for (const i in this.onlyListTeam1) {
              if (this.onlyListTeam1[i].player_id === item) {
                this.onlyListTeam1[i].isSelected = true;
                break;
              }
            }
          }
          for (const item of players2) {
            this.selectedPlayersTeam2.push(item);
            for (const i in this.onlyListTeam1) {
              if (this.onlyListTeam2[i].player_id === item) {
                this.onlyListTeam2[i].isSelected = true;
                break;
              }
            }
          }
          if (this.onlyListTeam1.length === players1.length) {
            this.selectedAllTeam1 = true;
            this.isAllPlayersSelected1 = true;
          }
          if (this.onlyListTeam2.length === players2.length) {
            this.selectedAllTeam2 = true;
            this.isAllPlayersSelected2 = true;
          }

          for (let i = 0; i < this.selectedPlayersTeam1.length; i++) {
            if (i + 1 === this.selectedPlayersTeam1.length) {
              this.team1String += '' + this.selectedPlayersTeam1[i] + '';
            } else {
              this.team1String += '' + this.selectedPlayersTeam1[i] + ',';
            }
          }

          for (let i = 0; i < this.selectedPlayersTeam2.length; i++) {
            if (i + 1 === this.selectedPlayersTeam2.length) {
              this.team2String += '' + this.selectedPlayersTeam2[i] + '';
            } else {
              this.team2String += '' + this.selectedPlayersTeam2[i] + ',';
            }
          }
        },
        error => {
          this.isLoading = false;
        });
  }

  getValue1(event:any) {
    this.team1String = '';
    if (event.checked) {
      this.selectedPlayersTeam1.push(event.source.value);
    } else {
      const index: number = this.selectedPlayersTeam1.indexOf(event.source.value);
      if (index !== -1) {
        this.selectedPlayersTeam1.splice(index, 1);
      }
    }
    for (let i = 0; i < this.selectedPlayersTeam1.length; i++) {
      if (i + 1 === this.selectedPlayersTeam1.length) {
        this.team1String += '' + this.selectedPlayersTeam1[i] + '';
      } else {
        this.team1String += '' + this.selectedPlayersTeam1[i] + ',';
      }
    }
  }

  getValue2(event:any) {
    this.team2String = '';
    if (event.checked) {
      this.selectedPlayersTeam2.push(event.source.value);
    } else {
      const index: number = this.selectedPlayersTeam2.indexOf(event.source.value);
      if (index !== -1) {
        this.selectedPlayersTeam2.splice(index, 1);
      }
    }
    for (let i = 0; i < this.selectedPlayersTeam2.length; i++) {
      if (i + 1 === this.selectedPlayersTeam2.length) {
        this.team2String += '' + this.selectedPlayersTeam2[i] + '';
      } else {
        this.team2String += '' + this.selectedPlayersTeam2[i] + ',';
      }
    }
  }

  goToss() {
    if (this.team1String === '' || this.team1String == null || this.team1String === undefined) {
      this.servicesService.openSnackBar('Please Select Team 1 Players', 'Close');
    } else if (this.team2String === '' || this.team2String == null || this.team2String === undefined) {
      this.servicesService.openSnackBar('Please Select Team 2 Players', 'Close');
    } else {
      this.servicesService.selectPlayers(this.matchId, this.team1String, this.team2String).subscribe(
        data => {
          this.router.navigate(['/edittoss', { 'matchId': this.matchId }], {skipLocationChange: true});
        });
    }
  }

  getAllSelectTeam1(event:any) {
    this.selectedAllTeam1 = event.checked;
    if (this.selectedAllTeam1 === true) {
      this.team1String = '';
      for (let i = 0; i < this.onlyListTeam1.length; i++) {
        if (i + 1 === this.onlyListTeam1.length) {
          this.team1String += '' + this.onlyListTeam1[i].player_id + '';
        } else {
          this.team1String += '' + this.onlyListTeam1[i].player_id + ',';
        }
      }
    } else {
      this.team1String = '';
    }
  }

  getAllSelectTeam2(event:any) {
    this.selectedAllTeam2 = event.checked;
    if (this.selectedAllTeam2 === true) {
      this.team2String = '';
      for (let i = 0; i < this.onlyListTeam2.length; i++) {
        if (i + 1 === this.onlyListTeam2.length) {
          this.team2String += '' + this.onlyListTeam2[i].player_id + '';
        } else {
          this.team2String += '' + this.onlyListTeam2[i].player_id + ',';
        }
      }
    } else {
      this.team2String = '';
    }
  }

}
