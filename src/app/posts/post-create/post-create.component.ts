import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private editMode = false;
  private postId: string;
  post: Post;
  isLoading = false;

  // @Output() postCreated = new EventEmitter<Post>();

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.editMode = false;
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    if (this.editMode) {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    } else {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content,
      };
      // this.postCreated.emit(post);
      this.postsService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
