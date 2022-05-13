import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrdersCardComponent } from './take-orders-card.component';

describe('TakeOrdersCardComponent', () => {
  let component: TakeOrdersCardComponent;
  let fixture: ComponentFixture<TakeOrdersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeOrdersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOrdersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
