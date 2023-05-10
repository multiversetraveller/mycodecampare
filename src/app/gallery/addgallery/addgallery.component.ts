import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.component.html',
  styleUrls: ['./addgallery.component.css']
})
export class AddgalleryComponent implements OnInit {
  imageChangedEvent: any = '';
  isCropper = false;
  croppedImage: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 150,
    y2: 150
  };
  currentScale = 1;
  transform = {};
  popupHeight: any;
  galleryImage:any = '';
  isLoaderShow = false;
  constructor(private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
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
    this.galleryImage = event.base64;
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
    const galleryArray = {
      series: window.localStorage.getItem('selectedSeries'),
      framename: this.galleryImage
    };
      this.isLoaderShow = true;
      this.serviceService.addGallery(galleryArray)
        .subscribe( (data: any) => {
          this.serviceService.openSnackBar('Add Photos Successfully', 'Close');
          this.router.navigate(['/gallery']);
        },
          (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Add Photos', 'Close');
        });
  }

}
