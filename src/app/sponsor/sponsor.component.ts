import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  no: number;
  type: string;
  name: string;
  company: string;
  mobile: number;
  image: string;
  action: number;
}

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  displayedColumns: string[] = ['no', 'type', 'name', 'company', 'mobile', 'image', 'action'];
  dataSource: MatTableDataSource<UserData>;
  sposorList: UserData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sposor: any;
  isLoaderShow = false;
  sposorli: any[] = [];
value: any;
  constructor(public router: Router, private serviceService: ApiservicesService) {
    this.dataSource = new MatTableDataSource(this.sposorList);
   }

  ngOnInit() {
    this.getAllSponser();
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
  getAllSponser() {
    this.sposorList = [];
    this.sposorli = [];
    this.isLoaderShow = true;
    this.serviceService.getAllSponser()
    .subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.sposorli.push(data);
        this.sposor = this.sposorli[0].data;
        let i = 1;
        for (const item of this.sposor) {
          this.sposorList.push({
            no: i++,
            name: item.name,
            type: item.sponsor_type,
            company: item.company,
            mobile: item.mobile,
            image: item.img,
            action: item.s_id
          });
        }
          this.dataSource = new MatTableDataSource<UserData>(this.sposorList);
          this.dataSource.paginator = this.paginator;
        },
      (        error: any) => {
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

  sponsorAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addsponsor']);
  }
  edit(s_id: any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/addsponsor', {'sponsorId': s_id}], {skipLocationChange: true});
  }
  delete(id: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Sponsor');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteSponser(id).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Sponsor Delete Successfully', 'Close');
          this.getAllSponser();
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Sponsor Delete Failed', 'Close');
        });
    }
}

}
