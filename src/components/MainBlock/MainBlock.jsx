import { useEffect, useState } from "react";
import PostDummy from "../PostDummy/PostDummy.jsx";
import "./MainBlock.css";

const MainBlock = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/posts");
                const data = await response.json();

                const postsWithStatus = data.posts.map((post, index) => {
                    return {
                        ...post,
                        status: index < data.posts.length / 2
                    };
                });

                setPosts(postsWithStatus);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    const handleDelete = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="main-wrapper">
            <h1 className="main-title">Dummy</h1>
            <div className="main-block">
                {posts.map((post) => (
                    <PostDummy
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        status={post.status}
                        onDelete={() => handleDelete(post.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainBlock;