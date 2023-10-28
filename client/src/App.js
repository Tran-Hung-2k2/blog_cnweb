import React from 'react';

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './Components/NavBar';
const AddBlog = lazy(() => import('./Pages/AddBlog'));
const UpdateBlog = lazy(() => import('./Pages/UpdateBlog'));
const Blogs = lazy(() => import('./Pages/Blogs'));
const BlogDetails = lazy(() => import('./Pages/BlogDetails'));
const NoMatch = lazy(() => import('./Components/NoMatch'));

const App = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<div className="container">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/blogs" />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogDetails />} />
                    <Route path="/addblog" element={<AddBlog />} />
                    <Route path="/blogs/update/:id" element={<UpdateBlog />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
