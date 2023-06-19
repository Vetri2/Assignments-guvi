// ProductForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(
                `https://6480412af061e6ec4d48e822.mockapi.io/products/${id}`
            );
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id
                ? `https://6480412af061e6ec4d48e822.mockapi.io/products/${id}`
                : "https://6480412af061e6ec4d48e822.mockapi.io/products";

            const method = id ? "PUT" : "POST";

            // Create or update the product using an API call
            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            // Navigate back to the product list page
            navigate("/products");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>{id ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
