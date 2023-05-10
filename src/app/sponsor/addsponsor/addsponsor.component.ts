import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-addsponsor',
  templateUrl: './addsponsor.component.html',
  styleUrls: ['./addsponsor.component.css']
})
export class AddsponsorComponent implements OnInit {
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
  txtSponsorName = '';
  txtSponsorType = '';
  txtFatherName = '';
  txtSurname = '';
  txtCompany = '';
  txtMobile = '';
  txtEmail = '';
  txtWebsite = '';
  txtAddress = '';
  isLoaderShow!: boolean;
  sponsorId: any;
  issponsorImageChanged = false;
  constructor(private serviceService: ApiservicesService, public router: Router, public route: ActivatedRoute ) { }

  ngOnInit() {
    this.sponsorId = this.route.snapshot.params['sponsorId'];
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
    if (this.sponsorId !== undefined) {
      this.getSponserById();
    }
  }

  getSponserById() {
    this.isLoaderShow = true;
    this.serviceService.getSponserById(this.sponsorId)
    .subscribe(
      (data:any) => {
        this.serviceService.getBase64Photo(data['img']).then((image:any) => {
          this.sponsorImage = image['base64'];
        });
        this.isLoaderShow = false;
        this.txtSponsorName = data['name'];
        this.txtSponsorType = data['sponsor_type'];
        this.txtFatherName = data['fathername'];
        this.txtSurname = data['surname'];
        this.txtCompany = data['company'];
        this.txtMobile = data['mobile'];
        this.txtEmail = data['email'];
        this.txtWebsite = data['website'];
        this.txtAddress = data['address'];
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

  save() {
    let sponsorIdArray = {};
    if (this.sponsorId !== undefined) {
      sponsorIdArray = {
        s_id: this.sponsorId,
        issponsorImageChanged: this.issponsorImageChanged
      };
    }

  const sponsorArray = {
    series: window.localStorage.getItem('selectedSeries'),
    name: this.txtSponsorName,
    sponsor_type: this.txtSponsorType,
    fathername: this.txtFatherName,
    surname: this.txtSurname,
    company: this.txtCompany,
    mobile: this.txtMobile,
    email: this.txtEmail,
    website: this.txtWebsite,
    address: this.txtAddress,
    img: this.sponsorImage,
    ...sponsorIdArray
  };
  if (this.txtSponsorName === '' || this.txtSponsorName == null || this.txtSponsorName === undefined) {
    this.serviceService.openSnackBar('Please Enter SponsorName', 'Close');
  } else if (this.txtSponsorType === '' || this.txtSponsorType == null || this.txtSponsorType === undefined) {
    this.serviceService.openSnackBar('Please Enter SponsorType', 'Close');
  } 
 
   else {
  this.isLoaderShow = true;
  if (this.sponsorId !== undefined) {
    this.serviceService.updateSponser(sponsorArray).subscribe(
      (      data: any) => {
        this.serviceService.openSnackBar('Sponsor Updated Successfully', 'Close');
        this.router.navigate(['/sponsor']);
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Some Error During Update Sponsor', 'Close');
      });
  } else {
  this.serviceService.addSponser(sponsorArray)
    .subscribe( (data: any) => {
      this.serviceService.openSnackBar('Sponsor Added Successfully', 'Close');
      this.router.navigate(['/sponsor']);
    },
      (    error: any) => {
      this.isLoaderShow = false;
      this.serviceService.openSnackBar('Some Error During Add Sponsor', 'Close');
    });
  }
  }
}
  back() {
    this.router.navigate(['/sponsor']);
  }
}
