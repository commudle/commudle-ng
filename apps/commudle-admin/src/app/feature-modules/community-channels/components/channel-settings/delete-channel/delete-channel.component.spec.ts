import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChannelComponent } from './delete-channel.component';

describe('ArchiveChannelComponent', () => {
  let component: DeleteChannelComponent;
  let fixture: ComponentFixture<DeleteChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteChannelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
