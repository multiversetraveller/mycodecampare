import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-editmatch',
  templateUrl: './editmatch.component.html',
  styleUrls: ['./editmatch.component.css']
})
export class EditmatchComponent implements OnInit {
  isLoading = true;
  matches: any[] = [];
  matchesList: any[] = [];
  isNoData = false;
  noDataMsg: any;
  dataflag: any;
  datamessage: any;
  datainsert: any;
  delete = faTrash;
  constructor(public router: Router, private servicesService: ApiservicesService) { }

  ngOnInit() {
    this.getMatchesList();
  }

  getMatchesList() {
    this.isLoading = true;
    this.servicesService.getCompletedMatches().subscribe(
      (      data: any) => {
        this.matches.push(data);
        this.matchesList = this.matches[0].data;
        this.noDataMsg = data['msg'];
        if (this.matchesList.length === 0) {
          this.isNoData = true;
        } else {
          this.isNoData = false;
        }
        this.isLoading = false;
      });
  }

  getDate(date: string) {
    const d = date.split('-');
    return d[0];
  }

  getMonth(date: string) {
    const d = date.split('-');
    return d[1];
  }

  matchSelect(matchId: any, team1Id: any, team2Id: any, team1Name: string, team2Name: string, team1Image: string, team2Image: string) {
    window.localStorage.setItem('team1Name', team1Name);
    window.localStorage.setItem('team2Name', team2Name);
    window.localStorage.setItem('team1Image', team1Image);
    window.localStorage.setItem('team2Image', team2Image);
    this.router.navigate(['/editselectplayer', { 'matchId': matchId, 'team1Id': team1Id, 'team2Id': team2Id }], {skipLocationChange: true});
  }

  scordboard(matchid: any) {
    this.isLoading = true;
    this.servicesService.editscordboard(matchid).subscribe(
      (      data:  any) => {
        this.dataflag = data['flag'];
        console.log(this.dataflag);
        this.datamessage = data['msg'];
        this.datainsert = data['queryScoreBoard'];
        console.log(this.datainsert);
        if (this.dataflag === true) {
          this.isLoading = false;
          this.servicesService.openSnackBar('socrboard added', 'Close');
        } else {
          this.servicesService.openSnackBar('scorboard not added', 'Close');
          this.isLoading = false;
        }
      });
  }

  deletescoredboard(matchid: any) {
    this.isLoading = true;
    this.servicesService.deletescoredboard(matchid).subscribe(
      (      data:any) => {
        this.isLoading = false;
        const datamessage = data['msg']
        this.servicesService.openSnackBar('successfully delete scoreboard data', 'Close');
      });
  }

  whowin(matchId: any,team1: any,team2: any,team1_id: any,team2_id: any){
    this.router.navigate(['/whowon', {
      'matchId': matchId,
      'team1Name': team1_id,
      'team2Name': team2_id,
      'team1Id': team1,
      'team2Id': team2
    }], { skipLocationChange: true });
  }
}
