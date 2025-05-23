import React from "react";
import { useParams } from "react-router-dom";
import useCreatePost from "../components/hooks/UseCreatePost";

const CreatePostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { title, setTitle, content, setContent, handleCreateSubmit, error, loading } = useCreatePost(id!);

    if (!id) { return <p>Thread ID is required</p>; }

    return (
        <div className="list">
            <h1 className="title">Create a new post</h1>
            <form onSubmit={handleCreateSubmit}>
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
                 {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default CreatePostPage;