import "./PostDummy.css";

const PostDummy = ({ id, title, body, status, onDelete }) => {
    return (
        <article className="post">
            <h2 className="post__title">{title}</h2>
            <p className="post__body">{body}</p>

            <span className={`post__status ${status ? "active" : "inactive"}`}>
                {status ? "True" : "False"}
            </span>

            <span className="post__id">#{id}</span>

            <button className="post__delete" onClick={onDelete}>
                Удалить
            </button>
        </article>
    );
};

export default PostDummy;