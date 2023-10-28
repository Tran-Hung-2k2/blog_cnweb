import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imageError, setImageError] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const {
        handleSubmit,
        reset,
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

    useEffect(() => {
        axios
            .get(`/api/blogs/${id}`)
            .then((res) => {
                setTitle(res.data.data.title);
                setBody(res.data.data.body);
                setImage(res.data.data.image);
                setValue('title', res.data.data.title);
                setValue('body', res.data.data.body);
                setValue('imageURL', res.data.data.image);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu blog:', error);
            });
    }, [id]);

    const onSubmit = async (data) => {
        try {
            const sendData = {
                title: data.title,
                body: data.body,
                image: data.imageBase64 || data.imageURL,
            };
            await axios.put(`/api/blogs/${id}`, sendData);
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
                Cập nhật
            </button>

            <button
                className="btn"
                type="button"
                onClick={() =>
                    reset((formValues) => ({
                        ...formValues,
                        title: title,
                        body: body,
                        imageURL: image,
                    }))
                }
                style={{ marginLeft: '8px' }}
            >
                Reset
            </button>
        </form>
    );
};

export default UpdateBlog;
