import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPayPalButtonsComponent } from './dialog-pay-pal-buttons.component';

describe('DialogPayPalButtonsComponent', () => {
  let component: DialogPayPalButtonsComponent;
  let fixture: ComponentFixture<DialogPayPalButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPayPalButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPayPalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
