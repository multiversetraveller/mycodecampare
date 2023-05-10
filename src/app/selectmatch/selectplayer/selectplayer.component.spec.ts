import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectplayerComponent } from './selectplayer.component';

describe('SelectplayerComponent', () => {
  let component: SelectplayerComponent;
  let fixture: ComponentFixture<SelectplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
