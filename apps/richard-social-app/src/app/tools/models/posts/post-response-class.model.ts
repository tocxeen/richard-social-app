export class PostResponseClass {
    constructor(
        private title: string,
        private content: string,
        private published: boolean,
        private id: number,
        private created_at: string,
        private owner_id: number,
        private owner: {
            username: string,
            email: string,
            id: number,
            created_at: string,
            updated_at: string
        },
        private votes: number
    ){}
}