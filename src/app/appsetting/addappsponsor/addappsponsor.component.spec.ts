import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddappsponsorComponent } from './addappsponsor.component';

describe('AddappsponsorComponent', () => {
  let component: AddappsponsorComponent;
  let fixture: ComponentFixture<AddappsponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddappsponsorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddappsponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
