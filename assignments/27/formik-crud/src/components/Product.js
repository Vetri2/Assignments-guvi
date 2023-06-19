// Product.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `https://6480412af061e6ec4d48e822.mockapi.io/products/${id}`
            );
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Product Details</h2>
            <Link to="/products" className="btn btn-primary mb-2">
                Back
            </Link>
            <div>
                <strong>ID:</strong> {product.id}
            </div>
            <div>
                <strong>Title:</strong> {product.name}
            </div>
            <div>
                <strong>Description:</strong> {product.description}
            </div>
        </div>
    );
};

export default Product;
