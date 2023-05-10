import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpointsComponent } from './viewpoints.component';

describe('ViewpointsComponent', () => {
  let component: ViewpointsComponent;
  let fixture: ComponentFixture<ViewpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
