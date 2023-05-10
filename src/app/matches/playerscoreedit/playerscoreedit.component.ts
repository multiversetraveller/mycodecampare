import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-playerscoreedit',
  templateUrl: './playerscoreedit.component.html',
  styleUrls: ['./playerscoreedit.component.css']
})
export class PlayerscoreeditComponent implements OnInit {
  MatchId: any;
  txtteam1name:any;
  firstTeam:any;
  isLoaderShow!: boolean;
  innfirstbatsmens: any[] = [];
  innfirstbolwer: any[] = [];
  firstinningbats: any[] = [];
  firstinningbol: any[] = [];
  firstinningextra: any[] = [];
  secondinningextra: any[] = [];
  innfirstextra: any[] = [];
  innsecondbatsmens: any[] = [];
  innsecondbolwer: any[] = [];
  secondinningbats: any[] = [];
  secondinningbol: any[] = [];
  innsecondextra: any[] = [];

  constructor(private serviceService: ApiservicesService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.MatchId = this.route.snapshot.params['matchId'];
    this.getPlayerscoredata();
    this.getdata();
    this.inningfirstbol();
    this.inningfirstbats();
    this.inningsecondbol();
    this.inningsecondbats();
    this.inningfirstextra();
    this.inningsecondextra();
  }

  getPlayerscoredata() {
    this.isLoaderShow = true;
    this.serviceService.getPlayerscoredata(this.MatchId).subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        console.log(data);
      },
      (error:any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Player Score', 'Close');
      });
  }

  getdata() {
    this.isLoaderShow = true;
    this.serviceService.getdata(this.MatchId).subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.firstinningbats.push(data['inning1_batsman']);
        this.firstinningbol.push(data['inning2_bowler_data']);
        this.secondinningbats.push(data['inning2_batsman']);
        this.secondinningbol.push(data['inning1_bowler_data']);
        this.firstinningextra.push(data['inning1_extra']);
        this.secondinningextra.push(data['inning2_extra']);
        this.inningfirstbats();
        this.inningsecondbats();
        this.inningfirstbol();
        this.inningsecondbol();
        this.inningfirstextra();
        this.inningsecondextra();
      },
      (error:any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Player Score', 'Close');
      });
  }

  back() {
    this.router.navigate(['/matches']);
  }

  inningfirstbats() {
    this.innfirstbatsmens = [];
    for (let i = 0; i < this.firstinningbats[0].length; i++) {
      this.innfirstbatsmens.push({
        player_id: this.firstinningbats[0][i].player_id,
        name: this.firstinningbats[0][i].name,
        run: this.firstinningbats[0][i].total_run,
        ball: this.firstinningbats[0][i].ball,
        four: this.firstinningbats[0][i].r4,
        six: this.firstinningbats[0][i].r6
      });
    }
  }

  addinningfirstbats(i: string | number) {
    this.innfirstbatsmens.push({
      player_id: this.firstinningbats[0][i].player_id,
      name: this.firstinningbats[0][i].name,
      run: this.firstinningbats[0][i].total_run,
      ball: this.firstinningbats[0][i].ball,
      four: this.firstinningbats[0][i].r4,
      six: this.firstinningbats[0][i].r6
    });
  }

  inningfirstbol() {
    this.innfirstbolwer = [];
    for (let i = 0; i < this.firstinningbol[0].length; i++) {
      this.innfirstbolwer.push({
        bowler_id: this.firstinningbol[0][i].bowler_id,
        name: this.firstinningbol[0][i].name,
        total_run: this.firstinningbol[0][i].total_run,
        over: this.firstinningbol[0][i].over,
        wicket: this.firstinningbol[0][i].wicket,
        maiden: this.firstinningbol[0][i].maiden
      });
    }
  }

  inningfirstextra() {
    this.innfirstextra.push({
      totalextra: this.firstinningextra[0].total_extra,
      lb: this.firstinningextra[0].lb,
      wide: this.firstinningextra[0].wide,
      nb: this.firstinningextra[0].nb,
      b: this.firstinningextra[0].b,
    });
  }

  inningsecondbats() {
    this.innsecondbatsmens = [];
    for (let i = 0; i < this.secondinningbats[0].length; i++) {
      this.innsecondbatsmens.push({
        player_id: this.secondinningbats[0][i].player_id,
        name: this.secondinningbats[0][i].name,
        run: this.secondinningbats[0][i].total_run,
        ball: this.secondinningbats[0][i].ball,
        four: this.secondinningbats[0][i].r4,
        six: this.secondinningbats[0][i].r6
      });
    }
  }

  addinningsecondbats(i: string | number) {
    this.innsecondbatsmens.push({
      player_id: this.secondinningbats[0][i].player_id,
      name: this.secondinningbats[0][i].name,
      run: this.secondinningbats[0][i].total_run,
      ball: this.secondinningbats[0][i].ball,
      four: this.secondinningbats[0][i].r4,
      six: this.secondinningbats[0][i].r6
    });
  }

  inningsecondbol() {
    this.innsecondbolwer = [];
    for (let i = 0; i < this.secondinningbol[0].length; i++) {
      this.innsecondbolwer.push({
        bowler_id: this.secondinningbol[0][i].bowler_id,
        name: this.secondinningbol[0][i].name,
        total_run: this.secondinningbol[0][i].total_run,
        over: this.secondinningbol[0][i].over,
        wicket: this.secondinningbol[0][i].wicket,
        maiden: this.secondinningbol[0][i].maiden
      });
    }
  }

  inningsecondextra() {
    this.innsecondextra.push({
      totalextra: this.secondinningextra[0].total_extra,
      lb: this.secondinningextra[0].lb,
      wide: this.secondinningextra[0].wide,
      nb: this.secondinningextra[0].nb,
      b: this.secondinningextra[0].b,
    });
  }

  remove(data1: string, i: number) {
    if (data1 === 'removefirstbats') {
      this.innfirstbatsmens.splice(i, 1);
    } else if (data1 === 'removefirstbol') {
      this.innfirstbatsmens.splice(i, 1);
    } else if (data1 === 'removesecondbats') {
      this.innfirstbatsmens.splice(i, 1);
    } else if (data1 === 'removesecondbol') {
      this.innfirstbatsmens.splice(i, 1);
    } else {
      alert('This data is not remove');
    }
  }
}
