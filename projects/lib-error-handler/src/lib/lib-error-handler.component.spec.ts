import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibErrorHandlerComponent } from './lib-error-handler.component';

describe('LibErrorHandlerComponent', () => {
  let component: LibErrorHandlerComponent;
  let fixture: ComponentFixture<LibErrorHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibErrorHandlerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
