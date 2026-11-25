import { useEffect, useState } from "react";
import PostDummy from "../PostDummy/PostDummy.jsx";
import "./MainBlock.css";

const MainBlock = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState(true);

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

    const handleAddPost = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        const newPost = {
            id: Date.now(),
            title: title,
            body: body,
            status: status
        };

        setPosts([newPost, ...posts]);
        setTitle("");
        setBody("");
        setStatus(true);
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="main-wrapper">
            <h1 className="main-title">Dummy</h1>

            <form className="add-form" onSubmit={handleAddPost}>
                <input
                    type="text"
                    placeholder="Заголовок поста"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Текст поста"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <div className="form-controls">
                    <label>
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                        Status (True)
                    </label>
                    <button type="submit">Добавить пост</button>
                </div>
            </form>

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