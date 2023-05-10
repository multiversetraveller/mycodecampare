import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  group: string;
  team: string;
  totalmatches: number;
  win: number;
  loss: number;
  points: number;
  avg: number;
  action: number;
}
@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  displayedColumns: string[] = ['group', 'team', 'totalmatches', 'win', 'loss', 'points', 'avg', 'action'];
  dataSource: MatTableDataSource<UserData>;
  points : any = [];
  isLoaderShow = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getpoint: any[] = [];
  viewpointdata: any[] = [];
  pointtbl: any;
value: any;
  constructor(
    public router: Router, private serviceService: ApiservicesService
  ) {
    this.dataSource = new MatTableDataSource(this.points);
   }

  ngOnInit() {
    // this.scoretomatchdata(); 
    // this.matchtopointdata();
    // this.commscore();
    this.getAllPoints();
  }

  getAllPoints() {
    this.points = [];
    this.getpoint = [];
    this.isLoaderShow = true;
    this.serviceService.getAllPoints().subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.getpoint.push(data);
        this.pointtbl = this.getpoint[0].data;
        for (const item of this.pointtbl) {
        this.points.push({
          group: item.gp_name,
          team: item.group_team,
          totalmatches: item.total_matches,
          win: item.win,
          loss: item.loss,
          points: item.points,
          avg: item.avg,
          action: item.group_id

        });
      }
      this.dataSource = new MatTableDataSource<UserData>(this.points);
      this.dataSource.paginator = this.paginator;
    },
    (error:any) => {
      this.isLoaderShow = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
   
  editPoints(id:any) {
    this.router.navigate(['/editpoints', {'groupId': id}], {skipLocationChange: true});
  }

  matchtopointdata() {
   this.serviceService.matchtopointdata().subscribe();
  }

  scoretomatchdata() {
    this.serviceService.scoretomatchdata().subscribe();
  }

  goOnViewpoints() {
    this.router.navigate(['/viewpoints'], {skipLocationChange: true});
  }

  commscore(){
    const series = window.localStorage.getItem('selectedSeries');
    window.open(`http://demo.vthinksolution.com/cricket/cric/services/scoringapp/comman_scoreboard.php?series=${series}`);
  }

}
