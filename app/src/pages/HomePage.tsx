import React from "react";
import { Link } from "react-router-dom";
import { useGetForumsQuery } from "../generated/graphql";
import PaginationStrip from "../components/PaginationStrip";

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
    
    return (
        <div className="list">
            <h1 className="title">Home</h1>
            <ul>
                {forums.map((forum) => (
                <li key={forum.id} className="item">
                    <Link to={`/forums/${forum.id}`}>
                        <h2 className="item-title">{forum.title}</h2>
                    </Link>
                    <p className="item-about">{forum.about}</p>
                </li>
                ))}
            </ul>
            <PaginationStrip pageSize={pageSize} elements_displayed={forums.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
};

export default HomePage;