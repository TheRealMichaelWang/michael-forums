import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery, useCreateReplyMutation } from "../generated/graphql";
import UserLabel from "../components/UserLabel";
import PaginationStrip from "../components/PaginationStrip";
import { SignedIn } from "@clerk/clerk-react";
import DateTimeLabel from "../components/DateTimeLabel";

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
        <div className="list">
            <h1 className="title">{post.title}</h1>
            <h2><UserLabel userId={post.authorId} username={post.authorName}/></h2>
            <DateTimeLabel obj={post}/>
            <p>{post.content}</p>
            <h2 className="subtitle">Replies</h2>
            <ul>
                {post.replies.map((reply) => (
                    <li key={reply.id} className="item">
                        <h3>{reply.content}</h3>
                        <UserLabel userId={reply.authorId} username={reply.authorName}/>
                        <DateTimeLabel obj={reply}/>
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