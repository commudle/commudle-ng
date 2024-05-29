/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CryptoCurrencyCardComponent } from './crypto-currency-card.component';

describe('CryptoCurrencyCardComponent', () => {
  let component: CryptoCurrencyCardComponent;
  let fixture: ComponentFixture<CryptoCurrencyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoCurrencyCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrencyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
