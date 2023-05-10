import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmssettingComponent } from './smssetting.component';

describe('SmssettingComponent', () => {
  let component: SmssettingComponent;
  let fixture: ComponentFixture<SmssettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmssettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmssettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
