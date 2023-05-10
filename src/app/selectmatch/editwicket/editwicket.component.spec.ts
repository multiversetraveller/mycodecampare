import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwicketComponent } from './editwicket.component';

describe('EditwicketComponent', () => {
  let component: EditwicketComponent;
  let fixture: ComponentFixture<EditwicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditwicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditwicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
