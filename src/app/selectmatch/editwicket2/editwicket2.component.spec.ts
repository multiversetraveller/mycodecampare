import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editwicket2Component } from './editwicket2.component';

describe('Editwicket2Component', () => {
  let component: Editwicket2Component;
  let fixture: ComponentFixture<Editwicket2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editwicket2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editwicket2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
