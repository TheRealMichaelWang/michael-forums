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
};

export type Forum = {
  __typename?: 'Forum';
  about: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  posts: Array<Post>;
  title: Scalars['String']['output'];
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
  deleteForum: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteReply: Scalars['Boolean']['output'];
  editForum: Scalars['Boolean']['output'];
  editPost: Scalars['Boolean']['output'];
  editReply: Scalars['Boolean']['output'];
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
  getForums: Array<Forum>;
};


export type MessageQueryGetForumsArgs = {
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Post = {
  __typename?: 'Post';
  authorId?: Maybe<Scalars['ID']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  forumId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  replies: Array<Reply>;
  title: Scalars['String']['output'];
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
  id: Scalars['ID']['output'];
  postId: Scalars['ID']['output'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  messageMutation?: Maybe<MessageMutation>;
  userMutation?: Maybe<UserMutation>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  forum?: Maybe<Forum>;
  messageQuery?: Maybe<MessageQuery>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
  userQuery?: Maybe<UserQuery>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  posts: Array<Post>;
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
  me: User;
};


export type UserQueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type GetForumsQueryVariables = Exact<{
  currentPage: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetForumsQuery = { __typename?: 'RootQuery', messageQuery?: { __typename?: 'MessageQuery', getForums: Array<{ __typename?: 'Forum', id: string, title: string, about: string }> } | null };


export const GetForumsDocument = gql`
    query GetForums($currentPage: Int!, $pageSize: Int!) {
  messageQuery {
    getForums(currentPage: $currentPage, pageSize: $pageSize) {
      id
      title
      about
    }
  }
}
    `;

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