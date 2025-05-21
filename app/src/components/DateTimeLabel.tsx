import React from "react";

const DateTimeLabel: React.FC<{obj: {createdAt: any, updatedAt: any}}> = ({obj}) => {
    const createdAt = new Date(obj.createdAt);
    const updatedAt = new Date(obj.updatedAt);

    return (
        <p className="mx-4 text-gray-500 text-sm">
            Created at {createdAt.toLocaleString()}  { (createdAt.getTime() !== updatedAt.getTime()) ?
                (<>and updated at {updatedAt.toLocaleString()}</>)
                : (<></>)
            }
        </p>
    )
}

export default DateTimeLabel;