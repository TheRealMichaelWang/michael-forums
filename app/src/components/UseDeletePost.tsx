import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../generated/graphql";

const useDeletePost = (postId: string, forumId: string) => {
    const [deletePost, {loading, error}] = useDeletePostMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post? The post will be deleted permanently."
        );
        if (!confirmed) { return; }

        try {
            await deletePost({
                variables: { id: postId }
            })
            navigate(`/forums/${forumId}`);
        } catch { }
    }

    return { handleDelete, loading, error }
}

export default useDeletePost;