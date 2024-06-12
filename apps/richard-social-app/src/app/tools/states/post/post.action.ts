import { createAction, props } from '@ngrx/store';

export const POST_START = '[Posts] Post Start';
export const POST_SUCCESS = '[Posts] Post Success';
export const POST_FAIL = '[Posts] Post Fail';
export const LOAD_POST_SUCCESS = '[Posts] Load All Posts Success';

export const DELETE_POST = '[Posts] Delete Post';
export const DELETE_POST_SUCCESS = '[Posts] Delete Post Success';

export const UPVOTE_POST = '[Posts] Upvote Post';
export const DOWNVOTE_POST = '[Posts] Downvote Post';
export const UPDATE_POST_SUCCESS = '[Posts] Update Post Success';

export const postStart = createAction(
  POST_START,
  props<{ title: string; content: string; published: boolean }>()
);

export const postSuccess = createAction(
  POST_SUCCESS, 
  props<{ post: any }>());

export const loadPost = createAction(LOAD_POST_SUCCESS);

export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
   props<{ posts: any[] }>());

export const deletePost = createAction(
  DELETE_POST,
  props<{ postId: number }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ postId: number }>()
);

export const upvotePost = createAction(
  UPVOTE_POST,
  props<{ postId: number }>()
);

export const downvotePost = createAction(
  DOWNVOTE_POST,
  props<{ postId: number }>()
);