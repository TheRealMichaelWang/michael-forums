import { Forum, Post, User, Reply } from '../generated/graphql'

//an empty user object to be used as a default value
export const emptyUser: User = {
    email: '',
    id: '',
    username: '',
    isAdmin: false,
    posts: [],
    updatedAt: new Date(0),
    createdAt: new Date(0)
}

//an empty forum object to be used as a default value
export const emptyForum : Forum = {
    id: '',
    title: '',
    about: '',
    posts: [],
    updatedAt: new Date(0),
    createdAt: new Date(0)
}

//an empty post object to be used as a default value
export const emptyPost : Post = {
    id: '',
    title: '',
    content: '',
    forumId: '',
    replies: [],
    updatedAt: new Date(0),
    createdAt: new Date(0)
}

export const emptyReply : Reply = {
    id: '',
    content: '',
    postId: '',
    authorId: '',
    updatedAt: new Date(0),
    createdAt: new Date(0)
}
