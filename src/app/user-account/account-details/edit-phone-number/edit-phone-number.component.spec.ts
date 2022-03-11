import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneNumberComponent } from './edit-phone-number.component';

describe('EditPhoneNumberComponent', () => {
  let component: EditPhoneNumberComponent;
  let fixture: ComponentFixture<EditPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhoneNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
