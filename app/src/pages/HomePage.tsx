import React from "react";
import { Link } from "react-router-dom";
import { useGetForumsQuery } from "../generated/graphql";

// HomePage component fetches and displays a list of forums
const HomePage: React.FC = () => {
    // store current page in state (default to 1)
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10; // number of forums to display per page; hardcoded for now
    // useQuery hook to execute the GraphQL query
    const { loading, error, data } = useGetForumsQuery({
        variables: { currentPage: 1, pageSize: 10 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const forums = data?.messageQuery?.getForums || [];
    const hasNextPage = forums.length === pageSize; // check if there are more forums to load

    return (
        <div>
            <h1>Forums</h1>
            <ul>
                {forums.map((forum: any) => (
                <li key={forum.id}>
                    <Link to={`/forums/${forum.id}`}>
                    <h2>{forum.title}</h2>
                    <p>{forum.about}</p>
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
    );
};

export default HomePage;