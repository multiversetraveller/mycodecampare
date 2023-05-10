import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgalleryComponent } from './addgallery.component';

describe('AddgalleryComponent', () => {
  let component: AddgalleryComponent;
  let fixture: ComponentFixture<AddgalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
