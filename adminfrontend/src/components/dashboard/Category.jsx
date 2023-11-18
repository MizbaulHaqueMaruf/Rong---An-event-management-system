import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from './Header';
import './App.css';

function Category() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    useEffect(() => {
     fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('  http://localhost:5000/api/category-get');
        const data = await response.json();

        if (response.ok) {
            setCategories(data.categorys);
        } else {
            console.error('Error fetching categories:', data.error);
        }
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newCategory);
        formData.append('image', categoryImage);
        const response = await fetch('http://localhost:5000/api/category-add', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            setCategories([data.category, ...categories]);
            setNewCategory('');
            setCategoryImage(null);
        } else {
            console.error('Error adding category:', data.error);
        }
    };

    return (
        <div className="cover">
            <div className='grid-container'>
                <Header />
                <Sidebar />
                <div className="main-content">
                    <h2>Add Category</h2>
                    <form onSubmit={handleCategorySubmit}>
                        <label>
                            Category Name:
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </label>
                        <label>
                            Category Image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
                            />
                        </label>
                        <button type="submit">Add Category</button>
                    </form>

                    <h2>Categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category._id}>
                                <img src={category.image} alt={category.name} />
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Category;
