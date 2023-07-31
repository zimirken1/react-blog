import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const params = useParams();
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Страница поста {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>
                    <div>
                        {post.id}. {post.title}
                    </div>
                    <div>
                        {post.body}
                    </div>
            </div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;