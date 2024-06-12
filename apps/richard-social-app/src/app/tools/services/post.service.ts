

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post, PostResponse, PostResponseClass, Register, } from "../models";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
    })
    export class PostService {

        constructor(private http:HttpClient) {}

        post( title: string, content: string,published: boolean):Observable<PostResponse>{
            const post:Post = {title,content,published};
            return this.http.post<PostResponse>(`${environment.baseUrl}/posts`, post)
        }

        getAllPost():Observable<PostResponse[]>{
            return this.http.get<PostResponse[]>(`${environment.baseUrl}/posts`)
        }

        deletePost(post_id:number):Observable<string>{
            return this.http.delete<string>(`${environment.baseUrl}/posts/${post_id}`)
        }

        upvotePost(post_id:number):Observable<string>{
            return this.http.put<string>(`${environment.baseUrl}/posts/${post_id}/upvote`,{})
        }

        downvotePost(post_id:number):Observable<string>{
            return this.http.put<string>(`${environment.baseUrl}/posts/${post_id}/downvote`,{})
        }

        formatLoginData(data:any){
            return  new PostResponseClass(
                data.title,
                data.content,
                data.published,
                data.id,
                data.created_at,
                data.owner_id,
                {
                    username: data.owner.username,
                    email: data.owner.email,
                    id: data.owner.id,
                    created_at: data.owner.created_at,
                    updated_at: data.owner.updated_at
                },
                data.votes
            );
        }

        formatLoginDataList(data: any[]): PostResponseClass[] {
            return data.map(post => new PostResponseClass(
              post.title,
              post.content,
              post.published,
              post.id,
              post.created_at,
              post.owner_id,
              {
                username: post.owner.username,
                email: post.owner.email,
                id: post.owner.id,
                created_at: post.owner.created_at,
                updated_at: post.owner.updated_at
              },
              post.votes
            ));
          }

        formatErrorMessage(message:string){
            switch(message){
                case 'Invalid Credentials':
                    return 'Try again, email or password is incorrect';

                case 'Invalid Username':
                    return 'Try again, email is incorrect';
                    
                default:
                    return 'Please try again';
            }
        }

    }