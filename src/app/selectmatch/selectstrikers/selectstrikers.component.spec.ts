import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectstrikersComponent } from './selectstrikers.component';

describe('SelectstrikersComponent', () => {
  let component: SelectstrikersComponent;
  let fixture: ComponentFixture<SelectstrikersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectstrikersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectstrikersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
