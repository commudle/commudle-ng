import { environment } from 'projects/commudle-admin/src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public isBot: boolean;

  constructor(
    private meta: Meta,
    private title: Title,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: any,
  ) {
    // using native js because angular's route takes somewhere between 100-200ms to initialize and get the queryparam
    const url = new URL(window.location.href);
    const bot = url.searchParams.get('bot');
    this.isBot = bot ? true : false;
  }

  setCanonical() {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.document.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.document.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    this.location.onUrlChange((url, state) => {
      element.setAttribute('href', `${environment.app_url}${url}`);
    });
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setTag(tag: string, content: string) {
    if (this.meta.getTag(`name="${tag}"`)) {
      this.meta.updateTag({ name: tag, property: tag, content: content });
    } else {
      this.meta.addTag({ name: tag, property: tag, content: content });
    }
  }

  removeTag(tag: string) {
    this.meta.removeTag(`name="${tag}"`);
  }

  setTags(title: string, description: string, image: string, contentType = 'website') {
    this.setTitle(title);
    this.setTag('description', description);
    this.setTag('image', image);
    this.setTag('og:title', title);
    this.setTag('og:description', description);
    this.setTag('og:image', image);
    this.setTag('og:image:secure_url', image);
    this.setTag('twitter:title', title);
    this.setTag('twitter:description', description);
    this.setTag('twitter:image', image);
    this.setTag('og:type', contentType);
  }

  noIndex(value: boolean) {
    if (value) {
      this.setTag('robots', 'noindex');
    } else {
      this.removeTag('robots');
    }
  }

  setSchema(schema: Record<string, any>, className = 'structured-data') {
    if (this.isBot) {
      let script;
      // let shouldAppend = false;
      // append only if schema doesn't already exist
      // if (this.document.head.getElementsByClassName(className).length) {
      //   script = this.document.head.getElementsByClassName(className)[0];
      // } else {
      //   shouldAppend = true;
      // }
      script = this.document.createElement('script');
      script.setAttribute('class', className);
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }

  removeSchema(): void {
    if (this.isBot) {
      const els = [];
      ['structured-data', 'structured-data-org'].forEach((c) => {
        els.push(...Array.from(this.document.head.getElementsByClassName(c)));
      });
      els.forEach((el) => this.document.head.removeChild(el));
    }
  }
}
