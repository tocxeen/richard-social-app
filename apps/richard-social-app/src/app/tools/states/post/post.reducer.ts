import { createReducer, on } from "@ngrx/store";
import { initialLoadState, initialState } from "./post.state";
import { deletePostSuccess, downvotePost, loadPostSuccess, postSuccess, upvotePost } from "./post.action";


const _postReducer = createReducer(initialState, 
    on(postSuccess, (state:any, action:any) => {
        return {
            ...state,
            posts: [...state.posts, action.post]
        }
    })
); 

const _loadReducer = createReducer(initialLoadState, 
    on(loadPostSuccess, (state:any, action:any) => {
        return {
            ...state,
            posts: action.posts
        }
    })
); 

const _deleteReducer = createReducer(initialState,
    on(deletePostSuccess, (state, action) => {
      const updatedPosts = state.posts.filter(post => post.id !== action.postId);
      return { ...state, posts: updatedPosts };
    })
  );

  const _upvoteReducer = createReducer(initialState,
    on(upvotePost, (state, action) => {
        
      return { ...state };
    })
  );

  const _downvoteReducer = createReducer(initialState,
    on(downvotePost, (state, action) => {
      return { ...state};
    })
  );

export function PostReducer(state:any, action:any) {
    return _postReducer(state, action);
}

export function LoaderReducer(state:any, action:any) {
    return _loadReducer(state, action);
}

export function DeleteReducer(state: any, action: any) {
    return _deleteReducer(state, action);
  }

  export function UpVoteReducer(state: any, action: any) {
    return _upvoteReducer(state, action);
  }

  export function DownVoteReducer(state: any, action: any) {
    return _downvoteReducer(state, action);
  }

  