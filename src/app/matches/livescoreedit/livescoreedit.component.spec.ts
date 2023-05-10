import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivescoreeditComponent } from './livescoreedit.component';

describe('LivescoreeditComponent', () => {
  let component: LivescoreeditComponent;
  let fixture: ComponentFixture<LivescoreeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivescoreeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivescoreeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
