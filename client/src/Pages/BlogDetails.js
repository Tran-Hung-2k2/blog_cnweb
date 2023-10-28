import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogDetails = () => {
    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data.data);
            })
            .catch((error) => {
                setBlog([]);
            });
    }, [id]);

    const deleteBlog = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    if (res.status === 204) {
                        navigate('/blogs');
                    } else {
                        throw new Error('Failed to delete blog');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting blog:', error);
                });
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn" onClick={() => navigate(-1)}>
                    Go Back
                </button>
                <div>
                    <button
                        className="btn"
                        style={{ marginRight: '10px', background: 'orange' }}
                        onClick={() => navigate(`/blogs/update/${id}`)}
                    >
                        Edit
                    </button>
                    <button className="btn" style={{ background: 'red' }} onClick={() => deleteBlog()}>
                        Delete
                    </button>
                </div>
            </div>
            <div>
                {!blog ? (
                    <div className="title">
                        <h1>Not found blog</h1>
                    </div>
                ) : (
                    <>
                        <div className="title">
                            <h1>{blog.name}</h1>
                        </div>
                        <div className="flex-container">
                            <h2 className="label">{blog.title}</h2>
                            <img src={blog.image} alt="" className="blog-img" />
                            <div className="blog-infos">
                                <div className="row">
                                    <p className="text" style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                        {blog.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogDetails;
