import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-editovers',
  templateUrl: './editovers.component.html',
  styleUrls: ['./editovers.component.css']
})
export class EditoversComponent implements OnInit {
remainWidth: any;
matchId: any;
inning1Data: any;
inning2Data: any;
inning1Team: any;
inning2Team: any;
isLoading = false;
isPlayerDiv = false;
bowlers: any;
popupHeight: any;
insidePopupHeight: any;
selectedBowler: any;
editedInning: any;
editedOver: any;
  constructor(
    private serviceService: ApiservicesService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.remainWidth = (window.innerWidth - 170) + 'px';
    this.popupHeight = (window.innerHeight - 100) + 'px';
    this.insidePopupHeight = (window.innerHeight - 134) + 'px';
    this.matchId = this.route.snapshot.params['matchId'];
    this.getOvers();
  }

  getOvers() {
    this.isLoading = true;
    console.log(this.matchId)
    this.serviceService.getOvers(this.matchId).subscribe(
      (data:any) => {
        this.isLoading = false;
        this.inning1Data = data['inning1'];
        console.log(this.inning1Data)
        this.inning2Data = data['inning2'];
        this.inning1Team = data['inning1'][0].team1_name;
        this.inning2Team = data['inning2'][0].team2_name;
      },
      (error:any) => {
        this.isLoading = false;
        this.serviceService.openSnackBar('Failed to fetch over data', 'Close');
      });
  }

  showBowler(teamId: any, playerId: any, inning: string, over: number) {
    this.selectedBowler = playerId;
    this.editedInning = inning;
    this.editedOver = over - 1;
    this.isLoading = true;
    if(inning == '1'){
      var teamid:any = window.localStorage.getItem('team2');
    }else{
      var teamid:any = window.localStorage.getItem('team1');
    }
    this.serviceService.getPlayersByTeam(teamid).subscribe(
      (data:any) => {
        this.isLoading = false;
        this.isPlayerDiv = true;
        this.bowlers = data['data'];
      },
      (error:any) => {
        this.isLoading = false;
        this.isPlayerDiv = false;
        this.serviceService.openSnackBar('Failed to fetch Bowlers', 'Close');
      });
  }

  updateBowler(bowlerId: any) {
    this.isLoading = true;
    this.serviceService.updateBowlerOfOver(bowlerId, this.matchId, this.editedInning, this.editedOver).subscribe(
      (data:any) => {
        this.isLoading = false;
        this.isPlayerDiv = false;
        this.serviceService.openSnackBar('Bowler Updated', 'Close');
        this.getOvers();
      },
      (error:any) => {
        this.isLoading = false;
        this.isPlayerDiv = false;
        this.getOvers();
        this.serviceService.openSnackBar('Failed to Update Bowler', 'Close');
      });
  }

  closeDialog() {
    this.isPlayerDiv = false;
    this.getOvers();
  }

  goOverBallPage(over: number, inning: any) {
    this.router.navigate(['/editscoreboard', {'over': over - 1, 'inning': inning, 'matchId': this.matchId}], {skipLocationChange: true});
  }

}
