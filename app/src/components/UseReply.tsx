import { useState } from "react"
import { useCreateReplyMutation } from "../generated/graphql"

const useReply = (postId: string, onSuccess: () => void) => {
    const [replyContent, setReplyContent] = useState("");
    const [createReply, { loading, error }] = useCreateReplyMutation();

    const handleReplySubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim()) { return; }

        try {
            const { data } = await createReply({
                variables: { postId, content: replyContent}
            })
            if (data?.messageMutation?.createReply?.id) { //reply sucesfully submited
                setReplyContent(""); //clear reply input box
                onSuccess();
            }
        } catch { }

        return [ replyContent, setReplyContent, handleReplySubmit, loading, error ]
    }
}

export default useReply;