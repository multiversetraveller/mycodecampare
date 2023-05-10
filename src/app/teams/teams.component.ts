import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  no: number;
  teamImage: string;
  teamName: string;
  ownerName: string;
  teamType: string;
  createdDate: string;
  action: number;
}
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'teamImage', 'teamName', 'ownerName', 'teamType', 'createdDate', 'action'];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource: any;
  teamDetail: any[] = [];
  team: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoaderShow = false;
value: any;
  constructor(public router: Router, private serviceService: ApiservicesService) { }

  ngOnInit() {
    this.getTeamdetail();
  }

  getTeamdetail() {
    this.ELEMENT_DATA = [];
    this.teamDetail = [];
    this.isLoaderShow = true;
    this.serviceService.getTeamdetail().subscribe(
        data => {
          this.isLoaderShow = false;
          this.teamDetail.push(data);
          this.team = this.teamDetail[0].data;
          let i = 1;
          for (const item of this.team) {
            const dd = new Date(item.created_date).getDate();
            const mm = new Date(item.created_date).getMonth() + 1;
            const yy = new Date(item.created_date).getFullYear();
            const createdDate = `${dd}-${mm}-${yy}`;
            this.ELEMENT_DATA.push({
              no: i++,
              teamImage: item.team_image,
              teamName: item.team_name,
              ownerName: item.name,
              teamType: item.team_type,
              createdDate: createdDate,
              action: item.team_id
            });
          }
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.isLoaderShow = false;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
  teamAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addteam']);
  }

  editTeam(id: any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/addteam', {'teamId': id}], {skipLocationChange: true});
  }

  deleteTeam(id: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete Team');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteTeam(id).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Team Delete Successfully', 'Close');
          this.getTeamdetail();
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Team Delete Failed', 'Close');
        });
    }
}

}
