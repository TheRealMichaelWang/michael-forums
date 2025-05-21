import React from "react";
import { Link } from "react-router-dom";

const UserLabel: React.FC<{userId?: string | null, username?: string | null}> = ({userId, username}) => {
    return (
        <p className="mx-4 text-gray-600 text-sm">
            {userId ? 
                (<Link to={`/users/${userId}`}>
                    <p className="item-about">By {username!}</p>
                </Link>) 
                : (<p className="item-about">By Deleted User</p>)
            }
        </p>
    );
}

export default UserLabel;