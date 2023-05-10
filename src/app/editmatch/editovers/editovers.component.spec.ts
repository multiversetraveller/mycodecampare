import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoversComponent } from './editovers.component';

describe('EditoversComponent', () => {
  let component: EditoversComponent;
  let fixture: ComponentFixture<EditoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditoversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
