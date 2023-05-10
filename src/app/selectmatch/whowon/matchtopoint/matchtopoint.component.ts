import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';
@Component({
  selector: 'app-matchtopoint',
  templateUrl: './matchtopoint.component.html',
  styleUrls: ['./matchtopoint.component.css']
})
export class MatchtopointComponent implements OnInit {

  constructor(public router: Router, private serviceService: ApiservicesService) { }

  ngOnInit() {
  }
  scoretomatchdata() {
    this.serviceService.scoretomatchdata().subscribe(data => {
      this.serviceService.openSnackBar('Sucessfully Update points Data..', 'Close');
    },
    error => {
      console.log(error);
      this.serviceService.openSnackBar('Error Update points Data', 'Close')
      
    });
  }
}
