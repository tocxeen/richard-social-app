import { PostResponse } from "../../models";



export interface PostResponseState{
    posts:PostResponse[];
}

export interface LoadResponseState{
    posts:PostResponse[];
}

export const initialState:PostResponseState ={
    posts:[]
}

export const initialLoadState:LoadResponseState ={
    posts:[]
}