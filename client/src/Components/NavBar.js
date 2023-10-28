import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav>
                <div className="nav-items container">
                    <div className="logo">
                        <a href="/">
                            <h1>Blogs App</h1>
                        </a>
                    </div>

                    <div className="box">
                        <form className="sbox" action="/blogs" method="get">
                            <input className="stext" type="text" name="title" placeholder="Tìm kiếm bài viết..." />
                        </form>
                    </div>

                    <ul>
                        <li>
                            <NavLink to="/blogs">Blogs</NavLink>
                        </li>
                        <li>
                            <NavLink to="/addblog">Add blog</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
