import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentlistComponent } from './tournamentlist.component';

describe('TournamentlistComponent', () => {
  let component: TournamentlistComponent;
  let fixture: ComponentFixture<TournamentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
