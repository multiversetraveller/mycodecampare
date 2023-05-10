import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public Editor: any = ClassicEditor;

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent!: string;
  // tslint:disable-next-line: no-inferrable-types
  log: string = '';
  @ViewChild('myckeditor') ckeditor: any;
  isLoaderShow = false;
  about: any[] = [];
  aboutus: any;
  id: any;

  constructor(private serviceService: ApiservicesService, public router: Router) {}

  ngOnInit() {
    this.getAbout();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
   
  }

  getAbout() {
    this.about = [];
    this.isLoaderShow = true;
    this.serviceService.getAbout()
    .subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.about.push(data);
        this.aboutus = this.about[0].data;
        for (const item of this.aboutus) {
            this.mycontent = item.about_detail,
            this.id = item.id
        }
      this.isLoaderShow = false;
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of AboutUs', 'Close');
      });
  }


  onChange($event: any): void {
    console.log('onChange');
    // this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log('onPaste');
    // this.log += new Date() + "<br />";
  }
  save() {
    const AbtArray = {
      series: window.localStorage.getItem('selectedSeries'),
      about_detail: this.mycontent,
      id: this.id
    };
      this.isLoaderShow = true;
      this.serviceService.updateAboutus(AbtArray)
        .subscribe( (data: any) => {
          this.serviceService.openSnackBar('update AboutUs Successfully', 'Close');
          this.router.navigate(['/aboutus']);
          this.getAbout();
        },
          ( error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During update AboutUs', 'Close');
        });
  }

}
