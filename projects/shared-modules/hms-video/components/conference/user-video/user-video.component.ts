import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.scss']
})
export class UserVideoComponent implements OnInit, OnChanges {
  @ViewChild('userVideo', {static: true}) previewVideo: ElementRef;
  @Input() stream;
  @Input() userDetails;
  @Input() overridable;
  @Output() mutePeer = new EventEmitter();
  @Output() removeFromStage = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.stream) {
      let video = this.previewVideo.nativeElement;
      video.srcObject = this.stream;
    }
  }

}
