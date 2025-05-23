import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Forum = {
  __typename?: 'Forum';
  about: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  posts: Array<Post>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type ForumPostsArgs = {
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type MessageMutation = {
  __typename?: 'MessageMutation';
  createForum: Forum;
  createPost: Post;
  createReply: Reply;
  deleteForum?: Maybe<Scalars['Void']['output']>;
  deletePost?: Maybe<Scalars['Void']['output']>;
  deleteReply?: Maybe<Scalars['Void']['output']>;
  editForum?: Maybe<Scalars['Void']['output']>;
  editPost?: Maybe<Scalars['Void']['output']>;
  editReply?: Maybe<Scalars['Void']['output']>;
};


export type MessageMutationCreateForumArgs = {
  about: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MessageMutationCreatePostArgs = {
  content: Scalars['String']['input'];
  forumId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MessageMutationCreateReplyArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};


export type MessageMutationDeleteForumArgs = {
  id: Scalars['ID']['input'];
};


export type MessageMutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MessageMutationDeleteReplyArgs = {
  id: Scalars['ID']['input'];
};


export type MessageMutationEditForumArgs = {
  about: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MessageMutationEditPostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MessageMutationEditReplyArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type MessageQuery = {
  __typename?: 'MessageQuery';
  getForum: Forum;
  getForums: Array<Forum>;
  getPost: Post;
};


export type MessageQueryGetForumArgs = {
  id: Scalars['ID']['input'];
};


export type MessageQueryGetForumsArgs = {
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type MessageQueryGetPostArgs = {
  id: Scalars['ID']['input'];
};

export type Post = {
  __typename?: 'Post';
  authorId?: Maybe<Scalars['ID']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  forumId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  replies: Array<Reply>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PostRepliesArgs = {
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Reply = {
  __typename?: 'Reply';
  authorId?: Maybe<Scalars['ID']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  postId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  messageMutation?: Maybe<MessageMutation>;
  userMutation?: Maybe<UserMutation>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  messageQuery?: Maybe<MessageQuery>;
  userQuery?: Maybe<UserQuery>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  posts: Array<Post>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};


export type UserPostsArgs = {
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type UserMutation = {
  __typename?: 'UserMutation';
  mockAuth?: Maybe<User>;
  mockRegister: User;
};


export type UserMutationMockAuthArgs = {
  id: Scalars['ID']['input'];
};


export type UserMutationMockRegisterArgs = {
  authUserId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserQuery = {
  __typename?: 'UserQuery';
  getUser: User;
  me?: Maybe<User>;
};


export type UserQueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'RootQuery', userQuery?: { __typename?: 'UserQuery', me?: { __typename?: 'User', id: string, isAdmin: boolean } | null } | null };

export type CreatePostMutationVariables = Exact<{
  forumId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', createPost: { __typename?: 'Post', id: string } } | null };

export type EditPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditPostMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', editPost?: any | null } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', deletePost?: any | null } | null };

export type CreateReplyMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateReplyMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', createReply: { __typename?: 'Reply', id: string } } | null };

export type EditReplyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type EditReplyMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', editReply?: any | null } | null };

export type DeleteReplyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReplyMutation = { __typename?: 'RootMutation', messageMutation?: { __typename?: 'MessageMutation', deleteReply?: any | null } | null };

export type ForumFieldsFragment = { __typename?: 'Forum', id: string, title: string, about: string };

export type PostFieldsFragment = { __typename?: 'Post', id: string, title: string, authorName?: string | null, authorId?: string | null, createdAt: any, updatedAt: any };

export type ReplyFieldsFragment = { __typename?: 'Reply', id: string, content: string, authorName?: string | null, authorId?: string | null, createdAt: any, updatedAt: any };

export type GetForumsQueryVariables = Exact<{
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetForumsQuery = { __typename?: 'RootQuery', messageQuery?: { __typename?: 'MessageQuery', getForums: Array<{ __typename?: 'Forum', id: string, title: string, about: string }> } | null };

export type GetForumQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetForumQuery = { __typename?: 'RootQuery', messageQuery?: { __typename?: 'MessageQuery', getForum: { __typename?: 'Forum', id: string, title: string, about: string, posts: Array<{ __typename?: 'Post', id: string, title: string, authorName?: string | null, authorId?: string | null, createdAt: any, updatedAt: any }> } } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetPostQuery = { __typename?: 'RootQuery', messageQuery?: { __typename?: 'MessageQuery', getPost: { __typename?: 'Post', content: string, forumId: string, id: string, title: string, authorName?: string | null, authorId?: string | null, createdAt: any, updatedAt: any, replies: Array<{ __typename?: 'Reply', id: string, content: string, authorName?: string | null, authorId?: string | null, createdAt: any, updatedAt: any }> } } | null };

export const ForumFieldsFragmentDoc = gql`
    fragment ForumFields on Forum {
  id
  title
  about
}
    `;
export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
  title
  authorName
  authorId
  createdAt
  updatedAt
}
    `;
export const ReplyFieldsFragmentDoc = gql`
    fragment ReplyFields on Reply {
  id
  content
  authorName
  authorId
  createdAt
  updatedAt
}
    `;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  userQuery {
    me {
      id
      isAdmin
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($forumId: ID!, $title: String!, $content: String!) {
  messageMutation {
    createPost(forumId: $forumId, title: $title, content: $content) {
      id
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      forumId: // value for 'forumId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($id: ID!, $title: String!, $content: String!) {
  messageMutation {
    editPost(id: $id, title: $title, content: $content)
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  messageMutation {
    deletePost(id: $id)
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const CreateReplyDocument = gql`
    mutation CreateReply($postId: ID!, $content: String!) {
  messageMutation {
    createReply(postId: $postId, content: $content) {
      id
    }
  }
}
    `;
export type CreateReplyMutationFn = Apollo.MutationFunction<CreateReplyMutation, CreateReplyMutationVariables>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyMutation, CreateReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, options);
      }
export type CreateReplyMutationHookResult = ReturnType<typeof useCreateReplyMutation>;
export type CreateReplyMutationResult = Apollo.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = Apollo.BaseMutationOptions<CreateReplyMutation, CreateReplyMutationVariables>;
export const EditReplyDocument = gql`
    mutation EditReply($id: ID!, $content: String!) {
  messageMutation {
    editReply(id: $id, content: $content)
  }
}
    `;
export type EditReplyMutationFn = Apollo.MutationFunction<EditReplyMutation, EditReplyMutationVariables>;

/**
 * __useEditReplyMutation__
 *
 * To run a mutation, you first call `useEditReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editReplyMutation, { data, loading, error }] = useEditReplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditReplyMutation(baseOptions?: Apollo.MutationHookOptions<EditReplyMutation, EditReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditReplyMutation, EditReplyMutationVariables>(EditReplyDocument, options);
      }
export type EditReplyMutationHookResult = ReturnType<typeof useEditReplyMutation>;
export type EditReplyMutationResult = Apollo.MutationResult<EditReplyMutation>;
export type EditReplyMutationOptions = Apollo.BaseMutationOptions<EditReplyMutation, EditReplyMutationVariables>;
export const DeleteReplyDocument = gql`
    mutation DeleteReply($id: ID!) {
  messageMutation {
    deleteReply(id: $id)
  }
}
    `;
export type DeleteReplyMutationFn = Apollo.MutationFunction<DeleteReplyMutation, DeleteReplyMutationVariables>;

/**
 * __useDeleteReplyMutation__
 *
 * To run a mutation, you first call `useDeleteReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReplyMutation, { data, loading, error }] = useDeleteReplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReplyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReplyMutation, DeleteReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReplyMutation, DeleteReplyMutationVariables>(DeleteReplyDocument, options);
      }
export type DeleteReplyMutationHookResult = ReturnType<typeof useDeleteReplyMutation>;
export type DeleteReplyMutationResult = Apollo.MutationResult<DeleteReplyMutation>;
export type DeleteReplyMutationOptions = Apollo.BaseMutationOptions<DeleteReplyMutation, DeleteReplyMutationVariables>;
export const GetForumsDocument = gql`
    query GetForums($currentPage: Int!, $pageSize: Int!) {
  messageQuery {
    getForums(currentPage: $currentPage, pageSize: $pageSize) {
      ...ForumFields
    }
  }
}
    ${ForumFieldsFragmentDoc}`;

/**
 * __useGetForumsQuery__
 *
 * To run a query within a React component, call `useGetForumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumsQuery({
 *   variables: {
 *      currentPage: // value for 'currentPage'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetForumsQuery(baseOptions: Apollo.QueryHookOptions<GetForumsQuery, GetForumsQueryVariables> & ({ variables: GetForumsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumsQuery, GetForumsQueryVariables>(GetForumsDocument, options);
      }
export function useGetForumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumsQuery, GetForumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumsQuery, GetForumsQueryVariables>(GetForumsDocument, options);
        }
export function useGetForumsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetForumsQuery, GetForumsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetForumsQuery, GetForumsQueryVariables>(GetForumsDocument, options);
        }
export type GetForumsQueryHookResult = ReturnType<typeof useGetForumsQuery>;
export type GetForumsLazyQueryHookResult = ReturnType<typeof useGetForumsLazyQuery>;
export type GetForumsSuspenseQueryHookResult = ReturnType<typeof useGetForumsSuspenseQuery>;
export type GetForumsQueryResult = Apollo.QueryResult<GetForumsQuery, GetForumsQueryVariables>;
export const GetForumDocument = gql`
    query GetForum($id: ID!, $currentPage: Int!, $pageSize: Int!) {
  messageQuery {
    getForum(id: $id) {
      ...ForumFields
      posts(currentPage: $currentPage, pageSize: $pageSize) {
        ...PostFields
      }
    }
  }
}
    ${ForumFieldsFragmentDoc}
${PostFieldsFragmentDoc}`;

/**
 * __useGetForumQuery__
 *
 * To run a query within a React component, call `useGetForumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumQuery({
 *   variables: {
 *      id: // value for 'id'
 *      currentPage: // value for 'currentPage'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetForumQuery(baseOptions: Apollo.QueryHookOptions<GetForumQuery, GetForumQueryVariables> & ({ variables: GetForumQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumQuery, GetForumQueryVariables>(GetForumDocument, options);
      }
export function useGetForumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumQuery, GetForumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumQuery, GetForumQueryVariables>(GetForumDocument, options);
        }
export function useGetForumSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetForumQuery, GetForumQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetForumQuery, GetForumQueryVariables>(GetForumDocument, options);
        }
export type GetForumQueryHookResult = ReturnType<typeof useGetForumQuery>;
export type GetForumLazyQueryHookResult = ReturnType<typeof useGetForumLazyQuery>;
export type GetForumSuspenseQueryHookResult = ReturnType<typeof useGetForumSuspenseQuery>;
export type GetForumQueryResult = Apollo.QueryResult<GetForumQuery, GetForumQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($id: ID!, $currentPage: Int!, $pageSize: Int!) {
  messageQuery {
    getPost(id: $id) {
      ...PostFields
      content
      forumId
      replies(currentPage: $currentPage, pageSize: $pageSize) {
        ...ReplyFields
      }
    }
  }
}
    ${PostFieldsFragmentDoc}
${ReplyFieldsFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *      currentPage: // value for 'currentPage'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables> & ({ variables: GetPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export function useGetPostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;