import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhowonComponent } from './whowon.component';

describe('WhowonComponent', () => {
  let component: WhowonComponent;
  let fixture: ComponentFixture<WhowonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhowonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhowonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
