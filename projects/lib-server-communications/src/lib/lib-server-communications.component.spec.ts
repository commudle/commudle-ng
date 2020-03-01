import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibServerCommunicationsComponent } from './lib-server-communications.component';

describe('LibServerCommunicationsComponent', () => {
  let component: LibServerCommunicationsComponent;
  let fixture: ComponentFixture<LibServerCommunicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibServerCommunicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibServerCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
