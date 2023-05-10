import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-whowon',
  templateUrl: './whowon.component.html',
  styleUrls: ['./whowon.component.css']
})
export class WhowonComponent implements OnInit {
  public team1Name = '';
  public team2Name = '';
  public matchId = '';
  public team1Id = '';
  public team2Id = '';
  public selectedTeam = '';
  public wonByText = '';
  public selectedPlayer = '';
  public playersTeam1:any = [];
  public onlyListTeam1:any = [];
  public playersTeam2 :any= [];
  public onlyListTeam2:any = [];
  public isLoaderShow = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public servicesService: ApiservicesService
  ) { }

  ngOnInit() {
    this.team1Name = this.route.snapshot.params['team1Name'];
    this.team2Name = this.route.snapshot.params['team2Name'];
    this.matchId = this.route.snapshot.params['matchId'];
    this.team1Id = this.route.snapshot.params['team1Id'];
    this.team2Id = this.route.snapshot.params['team2Id'];
    this.selectedTeam = this.team1Name;
    this.getPlayersByTeam1(this.team1Id);
    this.getPlayersByTeam2(this.team2Id);


  }

  getPlayersByTeam1(id: string) {
    this.servicesService.getPlayersByTeam(id).subscribe(
      (      data: any) => {
        this.playersTeam1.push(data);
        this.onlyListTeam1 = this.playersTeam1[0].data;
      });
  }

  getPlayersByTeam2(id: string) {
    this.servicesService.getPlayersByTeam(id).subscribe(
      (      data: any) => {
        this.playersTeam2.push(data);
        this.onlyListTeam2 = this.playersTeam2[0].data;
      });
  }

  finishMatch() {
    this.isLoaderShow = true;
    const matchId = this.matchId;
    const team = this.selectedTeam;
    const win = this.wonByText;
    let loss = '';
    const mom = this.selectedPlayer;
    if (team === this.team1Name) {
      loss = this.team2Name;
    } else {
      loss = this.team1Name;
    }
    this.servicesService.finishMatch(matchId, team, win, loss, mom).subscribe(
      (      data: any) => {
        this.scoretomatchdata();
        this.matchtopointdata();
        
        
        
        setTimeout(() => {
          this.isLoaderShow = false;
          this.router.navigate(['/matchtopoint'], { skipLocationChange: true });
        }, 5000);
      },
      (      error: any) => {
        this.isLoaderShow = false;
      });
  }

  scordboard(matchid: any) {

    this.servicesService.editscordboard(matchid).subscribe(
      (      data: any) => {
        console.log(data);
      
      });
  }

  matchtopointdata() {
    this.isLoaderShow = true;
    this.servicesService.matchtopointdata().subscribe((data: any) => {
      console.log(data);
      this.servicesService.openSnackBar('Sucessfully Update Match Data..', 'Close');
    },
      (      error: any) => {
        this.servicesService.openSnackBar('Error Update Match Data', 'Close')
        console.log(error);
        this.isLoaderShow = false;
      });
  }

  scoretomatchdata() {
    this.isLoaderShow = true;
    this.servicesService.scoretomatchdata().subscribe((data: any) => {
      console.log(data);
      this.servicesService.openSnackBar('Sucessfully Update points Data..', 'Close');
    },
      (      error: any) => {
        this.servicesService.openSnackBar('Error Update points Data', 'Close')
        console.log(error);
        this.isLoaderShow = false;
      });
  }
}
