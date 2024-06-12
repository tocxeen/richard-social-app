import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { Post, PostResponse } from '../../tools/models';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../dialog/post-form/post-form.component';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { AppState } from '../../tools/store/app.state';
import { getPosts, loadPosts } from '../../tools/states/post/post.selector';
import { deletePost, downvotePost, loadPost, upvotePost } from '../../tools/states/post/post.action';
import { AuthService } from '../../tools/services';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit{

  @Input() type: string | undefined;
  posts$: Observable<PostResponse[]> | undefined ;

  constructor(public dialog: MatDialog, private store:Store<AppState>,private authService:AuthService) {
    
  }

  ngOnInit(): void {
    this.filterPosts();
   
  }

  filterPosts(){
    if(this.type == 'personal'){
    this.posts$ = this.store.select(loadPosts).pipe(
      map(posts => posts?.filter((post) => post.owner.username === this.authService.getUserName()))
    );
  }else if(this.type == 'other'){
    this.posts$ = this.store.select(loadPosts).pipe(
      map(posts => posts?.filter((post) => post.owner.username != this.authService.getUserName()))
    );
  }
  else{
    this.posts$ = this.store.select(loadPosts)
  }
  }

  deletePost(postId: number) {
    this.store.dispatch(deletePost({ postId }));
  }

  openPostFormDialog(): void {  
  this.dialog.open(PostFormComponent, {
      width: '600px',
      height: '50vh',
    });
  }

  openConfirmDialog(postId:number): void {
    const dialogRef =  this.dialog.open(ConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.deletePost(postId);
     }
      
    });
  }

  upvotePost(postId: number) {
    this.store.dispatch(upvotePost({ postId }));
  }

  downvotePost(postId: number) {
    this.store.dispatch(downvotePost({ postId }));
  }

 

}
