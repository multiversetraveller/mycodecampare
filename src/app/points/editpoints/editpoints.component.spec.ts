import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpointsComponent } from './editpoints.component';

describe('EditpointsComponent', () => {
  let component: EditpointsComponent;
  let fixture: ComponentFixture<EditpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
