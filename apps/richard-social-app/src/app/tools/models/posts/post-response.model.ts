export interface PostResponse {

    title: string;
    content: string;
    published: boolean;
    id: number;
    created_at: string;
    owner_id: number;

    owner: {
        username: string;
        email: string;
        id: number;
        created_at: string;
        updated_at: string;
    };
    votes:number;

}


