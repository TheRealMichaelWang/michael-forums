import { useState } from "react";
import { useEditPostMutation } from "../generated/graphql";

const useEditPost = (post: { id: string, title: string, content: string }, onSuccess: () => void) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [editPost, {loading, error}] = useEditPostMutation();

    const startEditing = () => {
        setTitle(post.title);
        setContent(post.content);
        setEditing(true);
    };

    const cancelEditing = () => {
        setEditing(false);
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) { return; }
        if (!title.trim() || !content.trim()) { return; }

        try {
            await editPost({
                variables: { id: post.id, title, content }
            });
            setEditing(false);
            onSuccess();
        } catch { }
    }

    return {
        editing,
        startEditing,
        cancelEditing,
        title,
        setTitle,
        content,
        setContent,
        handleEditSubmit,
        loading,
        error
    };
} 

export default useEditPost;