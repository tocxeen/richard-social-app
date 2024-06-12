import { Actions,createEffect,ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { EMPTY, catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import { AlertService, PostService } from '../../services';
import { setErrorMessage, setLoadingSpinner } from '../shared/shared.actions';
import { deletePost, deletePostSuccess, downvotePost, loadPost, loadPostSuccess, postStart, postSuccess, upvotePost } from './post.action';


@Injectable()
export class RegisterEffects {

    constructor(
        private actions$:Actions, 
        private postService:PostService,
        private store:Store<AppState>,
        private alertService:AlertService
    ) {}


   post$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(postStart),
        exhaustMap((action) => {
           return this.postService.
           post(action.title,action.content,action.published).
           pipe(map((data) => {
            this.store.dispatch(setErrorMessage({message:''}));
            this.store.dispatch(setLoadingSpinner({status:false}));
            const post = this.postService.formatLoginData(data);
            this.alertService.success('Post submitted successfully');
            return postSuccess({post});
           }),
        catchError((errorResp:any)=>{
            this.store.dispatch(setLoadingSpinner({status:false}));
            const errorMessage = this.postService.formatErrorMessage(errorResp.error.detail);   
            return of(setErrorMessage({message:errorMessage}));
        }));
        }));
   });

   getAllPosts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(loadPost),
        exhaustMap((action) => {
           return this.postService.
           getAllPost().
           pipe(map((data) => {
            this.store.dispatch(setLoadingSpinner({status:false}));
            const posts = this.postService.formatLoginDataList(data);
            return loadPostSuccess({posts});
           }),
        catchError((errorResp:any)=>{
            this.store.dispatch(setLoadingSpinner({status:false}));
            const errorMessage = this.postService.formatErrorMessage(errorResp.error.detail);   
            return of(setErrorMessage({message:errorMessage}));
        }));
        }));
   });

   deletePost$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(deletePost),
        exhaustMap((action) => {
            return this.postService
              .deletePost(action.postId)
              .pipe(
                map(() => {
                 this.alertService.success('Post deleted successfully');
                 this.store.dispatch(setLoadingSpinner({status:false}));
                 
                  return deletePostSuccess({ postId: action.postId });
                }),
                catchError((error) => {
                  return EMPTY;
                })
              );
        })
    );
});


upvotePost$ = createEffect(() => this.actions$.pipe(
    ofType(upvotePost),
    exhaustMap((action) => this.postService.upvotePost(action.postId).pipe(
      map((data:any) => {
        if(data.detail=='Success'){
             this.alertService.success('Post upvoted successfully');
             return { type: '[Posts] no action' }; 
        }
        this.alertService.error(data.detail);
        return { type: '[Posts] no action' }; 
      }),
      catchError((error) => {
        return EMPTY;
      })
    ))
  ));
  
  downvotePost$ = createEffect(() => this.actions$.pipe(
    ofType(downvotePost),
    exhaustMap((action) => this.postService.downvotePost(action.postId).pipe(
      map((data) => {
        this.alertService.success('Post downvoted successfully');
        return { type: '[Posts] no action' };
      }),
      catchError((error) => {
        return EMPTY;
      })
    ))
  ));
   


    postFetch$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(postSuccess),
            tap((action)=>{
                // lookup for data 
            }))
    },{dispatch:false})
}