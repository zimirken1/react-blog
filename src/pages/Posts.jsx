import React, {useEffect, useState} from 'react';
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
import {usePagination} from "../components/hooks/usePagination";
import Pagination from "../components/UI/pagination/Pagination";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    // let pagesArray = getPagesArray(totalPages);
    // for (let i = 0; i < totalPages; i++) {
    //     pagesArray.push(i++);
    // }



    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit));
    })

    console.log(totalPages)

    useEffect(() => {
        fetchPosts().then();
    }, [page])

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
        <div className={"App"}>
            <MyButton onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <Loader/>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;