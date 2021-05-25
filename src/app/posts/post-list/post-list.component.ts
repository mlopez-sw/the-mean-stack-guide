import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input()
  posts: Post[] = [];
  private postsSubs: Subscription;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSubs = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubs.unsubscribe();
  }

  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }
}
