import { IUser } from "./../../../../../../../../shared-models/user.model";
import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-speaker-card",
  templateUrl: "./speaker-card.component.html",
  styleUrls: ["./speaker-card.component.scss"],
})
export class SpeakerCardComponent implements OnInit {
  
  @Input() speaker: IUser;

  constructor() {}

  ngOnInit(): void {}
}
