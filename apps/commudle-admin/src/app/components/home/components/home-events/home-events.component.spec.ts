import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeEventsComponent} from 'apps/commudle-admin/src/app/components/home/components/home-events/home-events.component';

describe('HomeEventsComponent', () => {
  let component: HomeEventsComponent;
  let fixture: ComponentFixture<HomeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEventsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
