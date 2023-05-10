import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-youtubelive',
  templateUrl: './youtubelive.component.html',
  styleUrls: ['./youtubelive.component.css']
})
export class YoutubeliveComponent implements OnInit {
  txtlink = '';
  isLoaderShow = false;
  txtYoulink = '';
  youtxt: any[] = [];
  you: any;

  constructor( private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.getYoutube();
  }
  getYoutube() {
  this.youtxt = [];
  this.isLoaderShow = true;
  this.serviceService.getYoutube()
  .subscribe(
    (data:any) => {
      this.isLoaderShow = false;
      this.youtxt.push(data);
            this.txtYoulink = this.youtxt[0].youtube_link;
            this.txtlink = this.youtxt[0].youtube_url;
    });
  }
  sendLink() {
    const youArray = {
      series: window.localStorage.getItem('selectedSeries'),
      youtube_link: this.txtYoulink
    };
      this.isLoaderShow = true;
      this.serviceService.addYoutubeLink(youArray)
        .subscribe( (data:any) => {
          this.serviceService.openSnackBar('Update Link Successfully', 'Close');
          this.router.navigate(['/youtubelive']);
          this.getYoutube();
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Link', 'Close');
        });
  }

  sendURL() {
    const youArray = {
      series: window.localStorage.getItem('selectedSeries'),
      youtube_url: this.txtlink,
    };
      this.isLoaderShow = true;
      this.serviceService.addYoutubeLink(youArray)
        .subscribe( (data:any) => {
          this.serviceService.openSnackBar('Update YouTube Link Successfully', 'Close');
          this.router.navigate(['/youtubelive']);
          this.getYoutube();
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update YouTube Link', 'Close');
        });
  }
}
