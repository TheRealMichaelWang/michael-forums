import React from "react";

const PaginationStrip: React.FC<{pageSize: number, elements_displayed: number, currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>}> = ({pageSize, elements_displayed, currentPage, setCurrentPage}) => {
    const hasPrevPage = currentPage > 1;
    const hasNextPage = elements_displayed === pageSize;

    return (
        <div className="pagination mb-8">
            <button
                className="pagination-button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!hasPrevPage}
            >
                Previous
            </button>

            <div className="mx-4 text-gray-600 text-sm">
                { (elements_displayed > 0)
                    ? (<>Displaying {pageSize*(elements_displayed-1)+1} - {pageSize*(elements_displayed-1)+elements_displayed}.</>)
                    : (<>End of list.</>)
                }
                
            </div>

            <button
                className="pagination-button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Next
            </button>
        </div>
    )
}

export default PaginationStrip