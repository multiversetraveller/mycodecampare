import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-addappsponsor',
  templateUrl: './addappsponsor.component.html',
  styleUrls: ['./addappsponsor.component.css']
})
export class AddappsponsorComponent implements OnInit {
  isLoaderShow = false;
  imageChangedEvent: any = '';
  isCropper = false;
  sponsorImage:any = '';
  croppedImage: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 150,
    y2: 150
  };
  currentScale = 1;
  transform = {};
  popupHeight = '';
  croppingType = '';
  issponsorImageChanged!: boolean;
  txtTitle = '';
  id: any;
  setting: any[] = [];
  sett: any;

  constructor(public router: Router, private serviceService: ApiservicesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
    if (this.id !== undefined) {
    this.getAppSponserById();
    }
  }
  getAppSponserById() {
    this.isLoaderShow = true;
    this.serviceService.getAppSponserById(this.id)
    .subscribe(
      ( data:any) => {
          this.isLoaderShow = false;
        this.serviceService.getBase64Photo(data['sponsor_image']).then((image:any) => {
          this.sponsorImage = image['base64'];
        });
          this.txtTitle = data['sponsor_type'];
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Setting', 'Close');
      });
  }

  scalePlus() {
    this.currentScale = this.currentScale + 0.2;
    this.transform = {
      scale: this.currentScale
    };
  }

  scaleDown() {
    this.currentScale = this.currentScale - 0.2;
    this.transform = {
      scale: this.currentScale
    };
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.issponsorImageChanged = true;
    this.sponsorImage = event.base64;
  }

  cropConfirm() {
    this.isCropper = false;
  }

  imageLoaded() {
    setTimeout(() => {
      this.cropper = {
        x1: 0,
        y1: 0,
        x2: 150,
        y2: 150
      };
    }, 10);
  }
  back() {
    this.router.navigate(['/appsetting']);
  }

  save() {
    let sponsorIdArray = {};
    if (this.id !== undefined) {
      sponsorIdArray = {
        id: this.id
      };
    }

    const SetArray = {
      series: window.localStorage.getItem('selectedSeries'),
      sponsor_type: this.txtTitle,
      sponsor_image: this.sponsorImage,
      ...sponsorIdArray
    };
    if (this.txtTitle === '' || this.txtTitle == null || this.txtTitle === undefined) {
      this.serviceService.openSnackBar('Please Enter title', 'Close');
    } else {
      this.isLoaderShow = true;
      if (this.id !== undefined) {
      this.serviceService.updateAppSponser(SetArray)
        .subscribe( (data: any) => {
          this.serviceService.openSnackBar('Update Sponsor Successfully', 'Close');
          this.router.navigate(['/appsetting']);
        },
          (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Upadate sposor', 'Close');
        });
    } else {
      this.serviceService.addAppSponser(SetArray)
        .subscribe( (data: any) => {
          this.serviceService.openSnackBar('Sponsor Added Successfully', 'Close');
          this.router.navigate(['/appsetting']);
        },
          (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Add sposor', 'Close');
        });
    }
  }
  }

}