import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../generated/graphql";

const CreatePostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [createPost, {loading}] = useCreatePostMutation();

    if (!id) { return <p>Thread ID is required</p>; }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting...");

        try {
            const { data } = await createPost({
                variables: { forumId: id, title, content },
            });
            console.log({ data });
            let post = data?.messageMutation?.createPost;
            if (post) {
                navigate(`/posts/${post.id}`);
            } else {
                alert("No post returned from mutation");
            }
        } catch (error: any) {
            alert(error?.message || "Unknown error");
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="list">
            <h1 className="title">Create a new post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 text-left">
                    <label className="block mb-2 font-semibold" htmlFor="title">
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="textarea"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label className="block mb-2 font-semibold" htmlFor="content">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="textarea"
                        rows={8}
                        placeholder="Write your post here..."
                    />
                </div>
                <button
                    type="submit"
                    className="button-primary"
                    disabled={loading || !title.trim() || !content.trim()}
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;