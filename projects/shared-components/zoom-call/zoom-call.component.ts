import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
// import { ZoomMtg } from '@zoomus/websdk';

// NEEDS TO BE FIXED AND BUILT UPON
@Component({
  selector: 'app-zoom-call',
  templateUrl: './zoom-call.component.html',
  styleUrls: ['./zoom-call.component.scss']
})
export class ZoomCallComponent implements OnInit {

  signatureEndpoint = ''
  apiKey = ''
  meetingNumber = 123456789
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = ''

  constructor(
    public httpClient: HttpClient, @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature);
        this.startMeeting(data.signature);
      } else {
        console.log(data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  startMeeting(signature) {

    // document.getElementById('zmmtg-root').style.display = 'block'

    // ZoomMtg.init({
    //   leaveUrl: this.leaveUrl,
    //   isSupportAV: true,
    //   success: (success) => {
    //     console.log(success)

    //     ZoomMtg.join({
    //       signature: signature,
    //       meetingNumber: this.meetingNumber,
    //       userName: this.userName,
    //       apiKey: this.apiKey,
    //       userEmail: this.userEmail,
    //       passWord: this.passWord,
    //       success: (success) => {
    //         console.log(success);
    //       },
    //       error: (error) => {
    //         console.log(error);
    //       }
    //     });

    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

}
