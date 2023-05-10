import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditscorecardComponent } from './editscorecard.component';

describe('EditscorecardComponent', () => {
  let component: EditscorecardComponent;
  let fixture: ComponentFixture<EditscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditscorecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
