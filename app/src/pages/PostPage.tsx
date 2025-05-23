import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery, useGetCurrentUserQuery } from "../generated/graphql";
import UserLabel from "../components/UserLabel";
import PaginationStrip from "../components/PaginationStrip";
import { SignedIn } from "@clerk/clerk-react";
import DateTimeLabel from "../components/DateTimeLabel";
import Markdown from "../components/Markdown";
import useReply from "../components/hooks/UseReply";
import useDeletePost from "../components/hooks/UseDeletePost";
import useEditPost from "../components/hooks/UseEditPost";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of comments to display per page; hardcoded for now

    const { isLoaded, isSignedIn } = useAuth();
    
    // useQuery hook to execute the GraphQL query
    const { loading, error, data, refetch: post_refetch } = useGetPostQuery({
        variables: { id: id!, currentPage: currentPage, pageSize: pageSize },
    });
    const post = data?.messageQuery?.getPost;

    const { data: user_data, loading: user_loading, refetch: user_refetch } = useGetCurrentUserQuery({ 
        variables: {},
        fetchPolicy: "network-only",
        skip: !isLoaded || !isSignedIn
    });
    const user_id = user_data?.userQuery?.me?.id;

    const {
        replyContent, setReplyContent, handleReplySubmit, 
        loading: replyLoading, error: replyError
    } = useReply(id!, () => {
        setCurrentPage(1);
        post_refetch();
        user_refetch();
    });

    const {
        editing, startEditing, cancelEditing, 
        title: editTitle, setTitle: setEditTitle, 
        content: editContent, setContent: setEditContent,
        handleEditSubmit,
        loading: editLoading, error: editError
    } = useEditPost(post ?? { id: "", title: "", content: "" }, () => {
        post_refetch();
        user_refetch();
    })

    const {handleDelete, loading: deleteLoading, error: deleteError} = useDeletePost(id!, post?.forumId ?? "")
    
    if (!isLoaded || loading || user_loading) return <p>Loading...</p>;
    if (deleteLoading) return <p>Deleting Post...</p>
    if (error) return <p>Error: {error.message}</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div className="list">
            <h1 className="title">{post.title}</h1>
            <h2><UserLabel userId={post.authorId} username={post.authorName}/></h2>
            <DateTimeLabel obj={post}/>

            {editing ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        className="textarea"
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                    <textarea
                        className="textarea"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={3}
                    />
                    <button 
                        type="submit" 
                        disabled={editLoading || !editContent.trim() || !editTitle.trim()} 
                        className="button-primary mr-2"
                    >
                        {editLoading ? "Saving edits..." : "Save"}
                    </button>
                    
                    <button 
                        type="button" 
                        className="button-secondary" 
                        onClick={cancelEditing}
                    >
                        Cancel
                    </button>

                    { editError && 
                        <span style={{ color: "red" }}>
                            Error: {editError.message}
                        </span>
                    }
                </form>
            ) : 
            (<>
                <Markdown markdownText={post.content}/>
                {deleteError && (
                    <span style={{ color: "red" }}>
                        Error: {deleteError.message}
                    </span>
                )}
            </>)}

            {user_id === post.authorId && !editing && (
                <div>
                    <button className="button-secondary" onClick={startEditing}>
                        Edit
                    </button>
                    <button className="button-secondary" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}

            <h2 className="subtitle">Replies</h2>
            <ul>
                {post.replies.map((reply) => (
                    <li key={reply.id} className="item">
                        <Markdown markdownText={reply.content}/>
                        <div>
                            <UserLabel userId={reply.authorId} username={reply.authorName}/>
                            <DateTimeLabel obj={reply}/>
                        </div>
                    </li>
                ))}
            </ul>
            <PaginationStrip pageSize={pageSize} elements_displayed={post.replies.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            
            <SignedIn>
                <form onSubmit={handleReplySubmit}>
                    <textarea
                        className="textarea"
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        required
                        rows={3}
                        style={{ width: "100%" }}
                    />
                    <button type="submit" disabled={replyLoading || !replyContent.trim()} className="button-primary">
                        {replyLoading ? "Posting..." : "Post Reply"}
                    </button>
                    {replyError && <p style={{ color: "red" }}>Error: {replyError.message}</p>}
                </form>
            </SignedIn>
            
            <div>
                <Link to={`/forums/${post.forumId}`} className="button-primary my-2 inline-block mx-auto">
                    Back to Forum
                </Link>
            </div>
        </div>
    )
}

export default PostPage;