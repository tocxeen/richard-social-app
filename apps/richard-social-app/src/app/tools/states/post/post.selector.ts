import { LoadResponseState, PostResponseState } from './post.state';

import { createFeatureSelector,createSelector } from "@ngrx/store";

export const POST_STATE_NAME = 'posts';
export const LOAD_STATE_NAME = 'loadPosts';


const getPostsState = createFeatureSelector<PostResponseState>(POST_STATE_NAME);

const loadPostsState = createFeatureSelector<LoadResponseState>(LOAD_STATE_NAME);


export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
});

export const loadPosts = createSelector(loadPostsState, (state) => state.posts);
