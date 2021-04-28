import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.scss']
})
export class CreateNewsletterComponent implements OnInit {

  // imagesList = [];

  // createNewsletterForm : FormGroup;

  // tinyMCE = {
  //   placeholder: 'Start typing here...*',
  //   min_height: 500,
  //   menubar: false,
  //   convert_urls: false,
  //   skin: 'outside',
  //   content_style: '@import url(\'https://fonts.googleapis.com/css?family=Work Sans\'); body {font-family: \'Work Sans\'; font-size: 20px !important;}',
  //   plugins: [
  //     'emoticons advlist lists autolink link charmap preview anchor',
  //     'visualblocks code charmap image codesample',
  //     'insertdatetime table paste code help wordcount autoresize media'
  //   ],
  //   toolbar:
  //     'formatselect | bold italic backcolor | codesample emoticons| \
  //     link | alignleft aligncenter alignright alignjustify | \
  //     bullist numlist outdent indent | image media | code | removeformat',
  //   codesample_languages: [
  //     {text: 'HTML/XML', value: 'markup'},
  //     {text: 'CSS', value: 'css'},
  //     {text: 'JavaScript', value: 'javascript'},
  //     {text: 'TypeScript', value: 'typescript'},
  //     {text: 'PHP', value: 'php'},
  //     {text: 'Ruby', value: 'ruby'},
  //     {text: 'Python', value: 'python'},
  //     {text: 'Java', value: 'java'},
  //     {text: 'C', value: 'c'},
  //     {text: 'C#', value: 'csharp'},
  //     {text: 'C++', value: 'cpp'}
  //   ],
  //   default_link_target: '_blank',
  //   image_list: this.imagesList,
  //   image_advtab: true,
  //   branding: false,
  //   // images_upload_handler: this.uploadTextImage.bind(this),
  //   toolbar_location: 'top',
  //   toolbar_sticky: true
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
