import React, { useState, useEffect } from 'react';
import './ProductCrud.css';
import { getProducts, createProduct, updateProduct, deleteProduct } from './ProductService';

const ProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        title: '',
        desc: '',
        img: [],
        categories: [],
        size: [],
        color: [],
        price: 0,
        inStock: true,
        quantity: 0
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateProduct(editId, form);
        } else {
            await createProduct(form);
        }
        loadProducts();
        setForm({
            title: '',
            desc: '',
            img: [],
            categories: [],
            size: [],
            color: [],
            price: 0,
            inStock: true,
            quantity: 0
        });
        setEditId(null);
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditId(product._id);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        loadProducts();
    };

    return (
        <div>
            <h1>ADMIN</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="desc" value={form.desc} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="img" value={form.img} onChange={handleChange} placeholder="Image URL" required />
                <input type="text" name="categories" value={form.categories} onChange={handleChange} placeholder="Categories" />
                <input type="text" name="size" value={form.size} onChange={handleChange} placeholder="Size" />
                <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Color" />
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
                <button type="submit">{editId ? 'Update' : 'Create'} Product</button>
            </form>
            <div>
                <h2>Products List</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.title} - {product.price}
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductCrud;
