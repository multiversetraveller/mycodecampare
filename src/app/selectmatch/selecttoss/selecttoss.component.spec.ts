import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecttossComponent } from './selecttoss.component';

describe('SelecttossComponent', () => {
  let component: SelecttossComponent;
  let fixture: ComponentFixture<SelecttossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecttossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecttossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
