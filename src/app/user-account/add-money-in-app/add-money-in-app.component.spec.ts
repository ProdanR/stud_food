import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyInAppComponent } from './add-money-in-app.component';

describe('AddMoneyInAppComponent', () => {
  let component: AddMoneyInAppComponent;
  let fixture: ComponentFixture<AddMoneyInAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyInAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyInAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
