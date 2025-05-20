import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery, useCreateReplyMutation } from "../generated/graphql";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of comments to display per page; hardcoded for now
    const [createReply, { loading: replyLoading, error: replyError }] = useCreateReplyMutation();

    const [replyContent, setReplyContent] = React.useState("");

    if (!id) { return <p>Post ID is required</p>; }

    // useQuery hook to execute the GraphQL query
    const { loading, error, data, refetch } = useGetPostQuery({
        variables: { id: id, currentPage: currentPage, pageSize: pageSize },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const post = data?.messageQuery?.getPost;
    if (!post) {
        return <p>Post not found</p>;
    }
    const hasNextPage = post.replies.length === pageSize;

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim()) {
            return;
        }
        try {
            await createReply({
                variables: { postId: id, content: replyContent },
            });
            setReplyContent("");
            setCurrentPage(1); // Reset to the first page after submitting a reply
            refetch(); // Refresh replies
        } catch (err) {
            // Error will be shown below
        }
    };


    return (
        <div>
            <h1>{post.title}</h1>
            <h2>By {post.authorName ?? "Deleted User"}</h2>
            <p>{post.content}</p>
            <h2>Replies</h2>
            <ul>
                {post.replies.map((reply) => (
                    <li key={reply.id}>
                        <h3>{reply.content}</h3>
                        <Link to={`/users/${reply.id}`}>
                            <p>By {reply.authorName ?? "Deleted User"}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleReplySubmit}>
                <textarea
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    required
                    rows={3}
                    style={{ width: "100%" }}
                />
                <button type="submit" disabled={replyLoading || !replyContent.trim()}>
                    {replyLoading ? "Posting..." : "Post Reply"}
                </button>
                {replyError && <p style={{ color: "red" }}>Error: {replyError.message}</p>}
            </form>
            <div>
                <Link to={`/forums/${post.forumId}`}>
                    Back to Forum
                </Link>
            </div>
            <div>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default PostPage;