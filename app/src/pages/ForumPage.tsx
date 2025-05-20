import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetForumQuery } from "../generated/graphql";

const ForumPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of posts to display per page; hardcoded for now

    if (!id) {
        return <p>Forum ID is required</p>;
    }

    // useQuery hook to execute the GraphQL query
    const { loading, error, data } = useGetForumQuery({
        variables: { id: id, currentPage: currentPage, pageSize: pageSize },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const forum = data?.messageQuery?.getForum;
    if (!forum) {
        return <p>Forum not found</p>;
    }
    const hasNextPage = forum.posts.length === pageSize;

    return (
        <div>
            <h1>{forum.title}</h1>
            <h2>{forum.about}</h2>
            <ul>
                {forum.posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`//${post.id}`}>
                            <h3>{post.title}</h3>
                            <p>By {post.authorName}</p>
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

export default ForumPage;