import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

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

  setTags(title: string, description: string, image: string) {
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
  }

  noIndex(value) {
    if (value) {
      this.meta.updateTag({
        name: 'robots',
        content: 'noindex',
      });
    } else {
      this.meta.removeTag("name='robots'");
    }
  }
}
