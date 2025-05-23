import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../generated/graphql";

const useCreatePost = (forumId: string) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createPost, {loading, error}] = useCreatePostMutation();

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await createPost({
                variables: { forumId: forumId, title, content },
            });
            console.log({ data });
            let post = data?.messageMutation?.createPost!;
            navigate(`/posts/${post.id}`);
        } catch { }
    };

    return { title, setTitle, content, setContent, handleCreateSubmit, loading, error};
}

export default useCreatePost;