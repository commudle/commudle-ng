import { HMSClient } from '@100mslive/hmsvideo-web';
import { HmsClientManagerService } from './../../services/hms-client-manager.service';
import { HmsApiService } from './../../services/hms-api.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LocalmediaService } from '../../services/localmedia.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit, OnDestroy {
  @Input() roomId;
  user: ICurrentUser;
  loading = true;
  clientToken: string;
  client: any;

  audioDevice: MediaDeviceInfo;
  videoDevice: MediaDeviceInfo;
  mic: boolean;
  camera: boolean;

  // streams
  localStream;
  localScreen;

  // list of all the peers in the room
  peers = {};

  constructor(
    private libAuthWatchService: LibAuthwatchService,
    private hmsApiService: HmsApiService,
    private hmsClientManagerService: HmsClientManagerService,
    private localMediaService: LocalmediaService
  ) { }

  ngOnDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  ngOnInit(): void {
    // setup the preselected devices
    const deviceListener =  combineLatest([
      this.localMediaService.selectedAudioDevice$,
      this.localMediaService.selectedVideoDevice$,
      this.localMediaService.mic$,
      this.localMediaService.camera$
    ]);

    deviceListener.subscribe(data => {
      this.audioDevice = data[0];
      this.videoDevice = data[1];
      this.mic = data[2];
      this.camera = data[3];

      // modify stream if the client is present (this will get changed from the settings component)
    });


    // get currentUser
    this.libAuthWatchService.currentUser$.subscribe(
      data => {
        this.user = data;
      }
    )

    // fetch the client token
    this.getClient();
  }

  getClient() {
    this.hmsApiService.getClientToken(this.roomId).subscribe(data => {
      this.clientToken = data.token;
      // create and connect the client to HMS Server using client token and join room
      this.connectToClient();
    });
  }

  connectToClient() {
    this.client = this.hmsClientManagerService.createClient(this.user.name, this.clientToken);
    this.hmsClientManagerService.connectClient(this.client).subscribe(
      data => {
        this.setupListeners();
      }
    )
  }

  setupListeners() {
    if (this.client) {
      // detect connection establish
      this.client.on('connect', () => {
        this.joinRoom();
      });

      // detect disconnect
      this.client.on('disconnect', () => {

      });


      // detect peer join
      this.client.on('peer-join', (room, peer) => {
        this.peers[peer.peerId] = peer;
      })

      // detect peer leave
      this.client.on('peer-leave', (room, peer) => {
        delete this.peers[peer.peerId];
      });

      // display the peer's stream
      this.client.on('stream-add', (room,  peer, streamInfo) => {
        this.addPeerStream(peer, streamInfo.mid);
      });

      // remove the peer's stream
      this.client.on('stream-remove', (room, peer, streamInfo) => {
          // Remove remote stream if needed
          delete this.peers[peer.peerId].stream;
      });

      // detect temporary socket disconnections
      this.client.on('disconnected', () => {
        // probably reload the page
      });
    }

  }

  joinRoom() {
    this.hmsClientManagerService.joinRoom(this.client, this.roomId).subscribe(
      data => {
        // get the localstream
        this.addLocalStream();
      }
    );
  }

  addLocalStream() {
    // get the local stream and the publish it to the room
    this.hmsClientManagerService.getLocalStream(this.client, this.audioDevice, this.videoDevice).subscribe(
      data => {
        this.localStream = data;

        // publish localstream to the room
        this.hmsClientManagerService.publishLocalStream(this.client, this.localStream, this.roomId).subscribe();
      }
    )
  }

  modifyLocalStream() {

  }

  addPeerStream(peer, mId) {
    this.hmsClientManagerService.getPeerStream(this.client, mId, this.roomId).subscribe(
      data => {
        if (!this.peers[peer.peerId]) {
          this.peers[peer.peerId] = peer
        }
        this.peers[peer.peerId].stream = data;
      }
    )
  }

  // this method is for the admin to be able to remove the stream of a peer
  removePeerStream(peerId, stream, roomId) {

    // find the peer, find the stream and remove it
  }



  // controls
  toggleVideo() {
    this.camera = !this.camera;
    this.camera ? this.localStream.unmute('video') : this.localStream.mute('video');
  }

  toggleAudio() {
    this.mic = !this.mic;
    this.mic ? this.localStream.unmute('audio') : this.localStream.mute('audio');
  }

}
