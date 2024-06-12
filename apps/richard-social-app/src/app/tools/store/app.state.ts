
import { LoginReducer } from "../states/auth/auth.reducer";
import { LOGIN_STATE_NAME } from "../states/auth/auth.selector";
import { LoginState } from "../states/auth/auth.state";
import { DeleteReducer, LoaderReducer, PostReducer } from "../states/post/post.reducer";
import { LOAD_STATE_NAME, POST_STATE_NAME } from "../states/post/post.selector";
import { LoadResponseState, PostResponseState } from "../states/post/post.state";
import { SharedReducer } from "../states/shared/shared.reducer";
import { SHARED_STATE_NAME } from "../states/shared/shared.selector";
import { SharedState } from "../states/shared/shared.state";


export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [LOGIN_STATE_NAME]:LoginState,
    [POST_STATE_NAME]:PostResponseState,
    [LOAD_STATE_NAME]:LoadResponseState
}

export const appReducer = {
    [SHARED_STATE_NAME]:SharedReducer,
    [LOGIN_STATE_NAME]:LoginReducer,
    [POST_STATE_NAME]:PostReducer,
    [LOAD_STATE_NAME]:LoaderReducer,
    deleteReducer: DeleteReducer
}