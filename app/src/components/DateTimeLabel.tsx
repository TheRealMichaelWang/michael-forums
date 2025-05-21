import React from "react";

const DateTimeLabel: React.FC<{obj: {createdAt: any, updatedAt: any}}> = ({obj}) => {
    let createdAt: Date = obj.createdAt
    let updatedAt: Date = obj.updatedAt

    return (
        <p>
            Created at {createdAt.toLocaleString()}  { (createdAt !== updatedAt) ?
                (<>and updated at {updatedAt.toLocaleString()}</>)
                : (<></>)
            }
        </p>
    )
}

export default DateTimeLabel;