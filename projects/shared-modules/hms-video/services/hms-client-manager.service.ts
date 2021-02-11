import { Injectable } from '@angular/core';
import { HMSPeer, HMSClientConfig, HMSClient, LocalStream, HMSMediaStreamConstraints, Stream } from "@100mslive/hmsvideo-web";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HmsClientManagerService {
  constructor() { }

  createClient(username, clientToken) {
    const config = new HMSClientConfig({
      endpoint: "wss://prod-in.100ms.live"
    });
    const peer = new HMSPeer(username, clientToken);

    return new HMSClient(peer, config);
  }

  connectClient(client: HMSClient): Observable<any> {
    return from(client.connect());
  }

  joinRoom(client: HMSClient, roomId): Observable<any> {
    return from(client.join(roomId));
  }


  getLocalStream(
    client: HMSClient, audioDevice: MediaDeviceInfo, videoDevice: MediaDeviceInfo, mic: boolean, camera: boolean
    ): Observable<any> {
    const localStreamConstraints: HMSMediaStreamConstraints = {
      resolution: 'vga',
      bitrate: 256,
      codec: 'VP8',
      frameRate: 20,
      shouldPublishAudio: mic,
      shouldPublishVideo: camera,
      advancedMediaConstraints: {
        audio: {
          deviceId: audioDevice.deviceId
        },
        video: {
          deviceId: videoDevice.deviceId
        }
      }
    };
    return from(
      client.getLocalStream(localStreamConstraints, {})
    );
  }

  // this will publish both audio/video and screen streams
  publishLocalStream(client: HMSClient, stream, roomId): Observable<any> {
    return from(client.publish(stream, roomId));
  }


  unpublishLocalStream(client: HMSClient, stream, roomId): Observable<any> {
    let tracks = stream.getTracks();
    for (let track of tracks) {
      track.stop();
    }
    return from(client.unpublish(stream, roomId));
  }



  getLocalScreen(client: HMSClient): Observable<any> {
    const localScreenConstraints: HMSMediaStreamConstraints = {
      resolution: null,
      bitrate: 0,
      codec: 'VP8',
      frameRate: 10,
      shouldPublishAudio: null,
      shouldPublishVideo: null,
      advancedMediaConstraints: null
    }

    return from(client.getLocalScreen(localScreenConstraints, {}));
  }




  // subscribe to remote peer's stream
  getPeerStream(client: HMSClient, mId, roomId): Observable<any> {
    return from(client.subscribe(mId, roomId));
  }

  // unsubscribe from remote peer's stream
  removePeerStream(client: HMSClient, stream, roomId): Observable<any> {
    return from(client.unsubscribe(stream, roomId));
  }

  // disconnectClient(client: HMSClient): Observable<void> {
  //   return from(client.disconnect());
  // }

}
