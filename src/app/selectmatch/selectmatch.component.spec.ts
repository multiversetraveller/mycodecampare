import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmatchComponent } from './selectmatch.component';

describe('SelectmatchComponent', () => {
  let component: SelectmatchComponent;
  let fixture: ComponentFixture<SelectmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectmatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
