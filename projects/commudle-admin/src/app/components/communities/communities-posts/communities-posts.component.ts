import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'projects/commudle-admin/src/app/services/posts.service';
import { IPost } from 'projects/shared-models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-communities-posts',
  templateUrl: './communities-posts.component.html',
  styleUrls: ['./communities-posts.component.scss']
})
export class CommunitiesPostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];

  subscription: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getPosts(): void {
    this.subscription = this.postsService.posts().subscribe(value => {
      this.posts = value.posts;
    });
  }

}
