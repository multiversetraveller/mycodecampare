import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchtopointComponent } from './matchtopoint.component';

describe('MatchtopointComponent', () => {
  let component: MatchtopointComponent;
  let fixture: ComponentFixture<MatchtopointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchtopointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchtopointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
