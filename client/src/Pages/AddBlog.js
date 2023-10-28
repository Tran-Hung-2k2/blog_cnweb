import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBlog = () => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState('');
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        criteriaMode: 'all',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const base64Image = e.target.result;
            setValue('imageBase64', base64Image);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        try {
            const sendData = {
                title: data.title,
                body: data.body,
                image: data.imageBase64 || data.imageURL,
            };
            await axios.post('/api/blogs', sendData);
            navigate('/blogs');
        } catch (error) {
            setImageError(error.response.data.error);
            console.error('Lỗi khi gọi API:', error.response.data.error);
        }
    };

    return (
        <form className="wrap_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form_element">
                <label>Tiêu đề:</label>
                <input type="text" name="title" {...register('title', { required: true, minLength: 1 })} />
                {errors.title && <span className="errors_label">Tiêu đề là trường bắt buộc.</span>}
            </div>

            <div className="form_element">
                <label>Nội dung:</label>
                <textarea name="body" {...register('body', { required: true, minLength: 1 })} />
                {errors.body && <span className="errors_label">Nội dung là trường bắt buộc.</span>}
            </div>

            <div className="form_element">
                <label>Ảnh</label>
                <input
                    type="text"
                    name="image"
                    placeholder="Nhập URL hoặc chọn file ảnh"
                    {...register('imageURL', { required: false })}
                />
                <input
                    style={{ marginLeft: '20px' }}
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    {...register('imageFile', { required: false })}
                    onChange={handleImageChange}
                />
                {(errors.imageURL || errors.imageFile) && (
                    <span className="errors_label">URL ảnh hoặc chọn ảnh từ máy tính là trường bắt buộc.</span>
                )}
                {imageError && <span className="errors_label">{imageError}</span>}
            </div>

            <button className="btn" type="submit">
                Đăng bài
            </button>
        </form>
    );
};

export default AddBlog;
