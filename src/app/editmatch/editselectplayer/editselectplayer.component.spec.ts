import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditselectplayerComponent } from './editselectplayer.component';

describe('EditselectplayerComponent', () => {
  let component: EditselectplayerComponent;
  let fixture: ComponentFixture<EditselectplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditselectplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditselectplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
