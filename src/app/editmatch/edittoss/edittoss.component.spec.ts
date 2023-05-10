import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittossComponent } from './edittoss.component';

describe('EdittossComponent', () => {
  let component: EdittossComponent;
  let fixture: ComponentFixture<EdittossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
