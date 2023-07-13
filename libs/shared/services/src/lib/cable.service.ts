import { Injectable } from '@angular/core';
import { Cable } from '@anycable/core';
import { Channel, createCable } from '@anycable/web';

@Injectable({
  providedIn: 'root',
})
export class CableService {
  cable!: Cable;

  constructor() {}

  createCable(url: string) {
    this.cable = createCable(url);
  }

  subscribe(channel: Channel) {
    this.cable.subscribe(channel);
  }
}
