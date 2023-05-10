import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommitteeComponent } from './addcommittee.component';

describe('AddcommitteeComponent', () => {
  let component: AddcommitteeComponent;
  let fixture: ComponentFixture<AddcommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
