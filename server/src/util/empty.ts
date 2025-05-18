import { Forum, Post, User } from '../generated/graphql'

//an empty user object to be used as a default value
export const emptyUser: User = {
    email: '',
    id: '',
    username: '',
    isAdmin: false,
    posts: []
}

//an empty forum object to be used as a default value
export const emptyForum : Forum = {
    id: '',
    title: '',
    about: '',
    posts: []
}

//an empty post object to be used as a default value
export const emptyPost : Post = {
    id: '',
    title: '',
    content: '',
    forumId: '',
    replies: []
}
