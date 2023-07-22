import React, {useState} from 'react';
import '../src/styles/App.css'
import '../src/components/PostForm'
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: "Title 1", body: "Description"},
        {id: 2, title: "Title 2", body: "Description"},
        {id: 3, title: "Title 3", body: "Description"},
        {id: 4, title: "Title 4", body: "Description"},
        {id: 5, title: "Title 5", body: "Description"},
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    return (
        <div className={"App"}>
            <PostForm create={createPost}/>
            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
};

export default App;