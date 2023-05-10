import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallerylist: any[] = [];
  gallery: any;
  isLoaderShow = false;

  constructor(
    public router: Router, private serviceService: ApiservicesService
  ) { }

  ngOnInit() {
    this.getGallery();
  }

  getGallery() {
    this.gallerylist = [];
    this.isLoaderShow = true;
    this.serviceService.getGallery().subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
          this.gallerylist.push(data);
          this.gallery = this.gallerylist[0].data;
      });
  }

  addGallery() {
    this.router.navigate(['/addgallery']);
  }

  delete(framename: any) {
    console.log(framename);
    const buttonClicked = confirm('Are You Want To Sure Delete This Image');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteGallery(framename).subscribe(
        (        data: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Image Delete Successfully', 'Close');
          this.getGallery();
        },
         
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Image Delete Successfully', 'Close');
          this.getGallery();
        });
    }
  }

}
