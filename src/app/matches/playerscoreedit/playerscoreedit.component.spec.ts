import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerscoreeditComponent } from './playerscoreedit.component';

describe('PlayerscoreeditComponent', () => {
  let component: PlayerscoreeditComponent;
  let fixture: ComponentFixture<PlayerscoreeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerscoreeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerscoreeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
