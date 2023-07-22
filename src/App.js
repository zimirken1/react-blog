import React, {useState} from 'react';
import '../src/styles/App.css'
import '../src/components/PostForm'
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import postItem from "./components/PostItem";

const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: "а", body: "а"},
        {id: 2, title: "б", body: "сс"},
        {id: 3, title: "г", body: "вфв"},
        {id: 4, title: "Title 4", body: "Description"},
        {id: 5, title: "Title 5", body: "Description"},
    ]);

    const [selectedSort, setSelectedSort] = useState(' ')

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return (
        <div className={"App"}>
            <PostForm create={createPost}/>
            <hr/>
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}
                />
            </div>
            {posts.length !== 0
                ?
                <PostList remove={removePost} posts={posts} title={"Список постов"}/>
                :
                <div>Посты не найдены!</div>
            }

        </div>
    );
};

export default App;