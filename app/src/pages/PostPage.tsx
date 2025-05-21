import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetPostQuery, useCreateReplyMutation, useGetCurrentUserQuery, useEditPostMutation, useDeletePostMutation } from "../generated/graphql";
import UserLabel from "../components/UserLabel";
import PaginationStrip from "../components/PaginationStrip";
import { SignedIn } from "@clerk/clerk-react";
import DateTimeLabel from "../components/DateTimeLabel";
import { marked } from "marked"

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of comments to display per page; hardcoded for now

    const [createReply, { loading: replyLoading, error: replyError }] = useCreateReplyMutation();
    const [replyContent, setReplyContent] = React.useState("");

    const [editPost, { loading: editPostLoading, error: editPostError}] = useEditPostMutation();
    const [editingPost, setEditingPost] = React.useState(false);
    //const [editingReplyId, setEditingReplyId] = React.useState<string | null>(null);
    const [editTitle, setEditTitle] = React.useState("");
    const [editContent, setEditContent] = React.useState("");
    const [editPostErrorMessage, setEditPostErrorMessage] = React.useState<string | null>(null);

    const [deletePost, { loading: deletePostLoading, error: deletePostError}] = useDeletePostMutation();
    const [deleteErrorMsg, setDeleteErrorMsg] = React.useState<string | null>(null);

    const { isLoaded, isSignedIn } = useAuth();
    const navigate = useNavigate();

    // useQuery hook to execute the GraphQL query
    const { loading, error, data, refetch } = useGetPostQuery({
        variables: { id: id!, currentPage: currentPage, pageSize: pageSize },
    });

    //get current user ID
    const { data: user_data, loading: user_loading, refetch: user_refetch } = useGetCurrentUserQuery({ 
        variables: {},
        fetchPolicy: "network-only",
        skip: !isLoaded || !isSignedIn
    });
    const user_id = user_data?.userQuery?.me?.id;
    
    if (!isLoaded || loading || user_loading) return <p>Loading...</p>;
    if (deletePostLoading) return <p>Deleting Post...</p>
    if (error) return <p>Error: {error.message}</p>;
    if (!id) { return <p>Post ID is required</p>; }

    const post = data?.messageQuery?.getPost;
    if (!post) {
        return <p>Post not found</p>;
    }

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim()) {
            return;
        }

        try {
            const {data} =await createReply({
                variables: { postId: id, content: replyContent },
            });

            if (data?.messageMutation?.createReply?.id) {
                setReplyContent("");
                setCurrentPage(1); // Reset to the first page after submitting a reply
                refetch(); // Refresh replies
                user_refetch();
            }
        } catch { }
    };

    const handleEditPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editContent.trim() || !editTitle.trim()) {
            return;
        }

        try{
            const {data} = await editPost({
                variables: { id: id, title: editTitle, content: editContent}
            })

            if (data?.messageMutation?.editPost) {
                setEditingPost(false);
                refetch(); // Refresh replies
                user_refetch();
            }
            else {
                setEditPostErrorMessage("You do not have permission to edit this post.");
            }
        }
        catch { }
    }

    const handleDeletePost = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post? The post will be deleted permanently.");
        if (!confirmed) return;

        try {
            const {data} = await deletePost({
                variables: { id: id }
            })
            if (data?.messageMutation?.deletePost) {
                navigate(`/forums/${post.forumId}`);
            }
            else {
                setDeleteErrorMsg("You do not have permission to delete this post!");
            }
        }
        catch { }
    }

    return (
        <div className="list">
            <h1 className="title">{post.title}</h1>
            <h2><UserLabel userId={post.authorId} username={post.authorName}/></h2>
            <DateTimeLabel obj={post}/>

            {editingPost ? (
                <form onSubmit={handleEditPost}>
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
                    <button type="submit" disabled={editPostLoading || !editContent.trim() || !editTitle.trim()} className="button-primary mr-2">
                        {editPostLoading ? "Saving edits..." : "Save"}
                    </button>
                    <button type="button" className="button-secondary" onClick={() => setEditingPost(false)}>Cancel</button>
                { (editPostError || editPostErrorMessage) && 
                    <span style={{ color: "red" }}>
                        Error: {editPostError?.message || editPostErrorMessage}
                    </span>
                }
                </form>
            ) : 
            (<>
                <span
                    dangerouslySetInnerHTML={{ __html: marked.parse(post.content, { breaks: true }) }}
                />
                
                {(deletePostError || deleteErrorMsg) && (
                    <span style={{ color: "red" }}>
                        Error: {deletePostError?.message || deleteErrorMsg}
                    </span>
                )}
            </>)}

            {user_id === post.authorId && !editingPost && (
                <div>
                    <button className="button-secondary" onClick={() => {
                        setEditingPost(true);
                        setEditContent(post.content);
                        setEditTitle(post.title);
                    }}>
                        Edit
                    </button>

                    <button className="button-secondary" onClick={handleDeletePost}>
                        Delete
                    </button>
                </div>
            )}

            <h2 className="subtitle">Replies</h2>
            <ul>
                {post.replies.map((reply) => (
                    <li key={reply.id} className="item">
                        <span
                            dangerouslySetInnerHTML={{ __html: marked.parse(reply.content, { breaks: true }) }}
                        />
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