import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarMobileComponent } from './tool-bar-mobile.component';

describe('ToolBarMobileComponent', () => {
  let component: ToolBarMobileComponent;
  let fixture: ComponentFixture<ToolBarMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
