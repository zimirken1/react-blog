import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return (
            <h1>
                Посты не найдены!
            </h1>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} key={post.id} post={post}
                />)}
        </div>
    );
};

export default PostList;