import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveChannelComponent } from './archive-channel.component';

describe('ArchiveChannelComponent', () => {
  let component: ArchiveChannelComponent;
  let fixture: ComponentFixture<ArchiveChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
