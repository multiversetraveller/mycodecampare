import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeapiurlComponent } from './changeapiurl.component';

describe('ChangeapiurlComponent', () => {
  let component: ChangeapiurlComponent;
  let fixture: ComponentFixture<ChangeapiurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeapiurlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeapiurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
