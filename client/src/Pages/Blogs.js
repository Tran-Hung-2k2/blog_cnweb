import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Lấy giá trị "title" từ URL (nếu có)
        const parsedQuery = queryString.parse(window.location.search);
        const title = parsedQuery.title;

        // Tạo URL truy vấn với "title" (nếu có)
        const apiUrl = title ? `/api/blogs?title=${title}` : '/api/blogs';

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setBlogs(data.data);
                }
            })
            .catch((error) => {
                setBlogs([]);
            });
    }, []);

    return (
        <div className="container">
            <div className="title">
                <h1>Blogs</h1>
            </div>
            <div className="blogs-container">
                {!blogs
                    ? 'Loading...'
                    : blogs.length === 0
                    ? 'Chưa có blog nào'
                    : blogs.map((blog) => (
                          <div key={blog._id} className="blog-card">
                              <img src={blog.image} alt="" className="blog-img" />
                              <div className="blog-info">
                                  <Link className="content-text" to={`/blogs/${blog._id}`}>
                                      <h2 className="blog-name">{blog.title}</h2>
                                      <span className="info">{blog.body}</span>
                                  </Link>
                                  <Link  className="content-link" to={`/blogs/${blog._id}`}>
                                      <div className="btn">Details</div>
                                  </Link>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Blogs;
