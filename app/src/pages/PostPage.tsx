import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../generated/graphql";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of comments to display per page; hardcoded for now

    if (!id) { return <p>Post ID is required</p>; }

    // useQuery hook to execute the GraphQL query
    const { loading, error, data } = useGetPostQuery({
        variables: { id: id, currentPage: currentPage, pageSize: pageSize },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const post = data?.messageQuery?.getPost;
    if (!post) {
        return <p>Post not found</p>;
    }
    const hasNextPage = post.replies.length === pageSize;

    return (
        <div>
            <h1>{post.title}</h1>
            <h2>By {post.authorName ?? "Deleted User"}</h2>
            <p>{post.content}</p>
            <h2>Replies</h2>
            <ul>
                {post.replies.map((reply) => (
                    <li key={reply.id}>
                        <Link to={`/${reply.id}`}>
                            <h3>{reply.content}</h3>
                            <p>By {reply.authorName ?? "Deleted User"}</p>
                        </Link>
                    </li>
                ))}
            </ul>
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