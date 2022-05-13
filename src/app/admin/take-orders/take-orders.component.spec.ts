import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrdersComponent } from './take-orders.component';

describe('TakeOrdersComponent', () => {
  let component: TakeOrdersComponent;
  let fixture: ComponentFixture<TakeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
