import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetForumQuery } from "../generated/graphql";
import { SignedIn } from "@clerk/clerk-react";
import UserLabel from "../components/UserLabel";
import PaginationStrip from "../components/PaginationStrip";
import DateTimeLabel from "../components/DateTimeLabel";

const ForumPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of posts to display per page; hardcoded for now

    if (!id) { return <p>Forum ID is required</p>;}

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

    return (
        <div className="list">
            <h1 className="title">{forum.title}</h1>
            <h2>{forum.about}</h2>
            <SignedIn>
                <Link to={`/create-post/${forum.id}`} className="button-primary my-2 inline-block mx-auto">
                    Create a Post
                </Link>
            </SignedIn>
            <ul>
                {forum.posts.map((post) => (
                    <li key={post.id} className="item">
                        <Link to={`/posts/${post.id}`}>
                            <h3 className="item-title">{post.title}</h3> 
                        </Link>
                        <div>
                            <UserLabel userId={post.authorId} username={post.authorName}/>
                            <DateTimeLabel obj={post}/>
                        </div>
                    </li>
                ))}
            </ul>            
            <PaginationStrip pageSize={pageSize} elements_displayed={forum.posts.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default ForumPage;