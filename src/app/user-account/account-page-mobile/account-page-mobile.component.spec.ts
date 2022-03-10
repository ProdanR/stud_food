import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageMobileComponent } from './account-page-mobile.component';

describe('AccountPageMobileComponent', () => {
  let component: AccountPageMobileComponent;
  let fixture: ComponentFixture<AccountPageMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
