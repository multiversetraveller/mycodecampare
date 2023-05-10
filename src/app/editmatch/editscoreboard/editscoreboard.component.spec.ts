import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditscoreboardComponent } from './editscoreboard.component';

describe('EditscoreboardComponent', () => {
  let component: EditscoreboardComponent;
  let fixture: ComponentFixture<EditscoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditscoreboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditscoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
