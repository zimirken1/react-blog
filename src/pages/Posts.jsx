import React, {useEffect, useRef, useState} from 'react';
import '../styles/App.css'
import '../components/PostForm'
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../components/hooks/useFetching";
import {getPagesCount} from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import '../styles/Posts.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts().then();
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className={"post-page"}>
            <div className={"post-page__operations"}>
                <MyButton onClick={() => setModal(true)}>
                    Создать пост
                </MyButton>
                <MyModal
                    visible={modal}
                    setVisible={setModal}
                >
                    <PostForm create={createPost}/>
                </MyModal>
                <div className={"post-page__sort-options"}>
                    <PostFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <MySelect
                        value={limit}
                        onChange={value => setLimit(value)}
                        defaultValue={"Кол-во элементов на странице"}
                        options={[
                            {value: 5, name: "5"},
                            {value: 10, name: "10"},
                            {value: 25, name: "25"},
                            {value: -1, name: "Показать все "},
                        ]}
                    />
                </div>
            </div>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
            <div ref={lastElement}></div>
            {isPostsLoading && <Loader/>}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;