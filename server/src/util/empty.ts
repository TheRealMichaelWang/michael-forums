import { Forum, Post, User } from '../generated/graphql'

export const emptyUser: User = {
    email: '',
    id: '',
    username: '',
    isAdmin: false,
    posts: []
}
export const emptyForum : Forum = {
    id: '',
    title: '',
    about: '',
    posts: []
}
export const emptyPost : Post = {
    id: '',
    title: '',
    content: '',
    forumId: '',
    replies: []
}
