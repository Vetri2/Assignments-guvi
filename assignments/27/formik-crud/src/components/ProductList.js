import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://6480412af061e6ec4d48e822.mockapi.io/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            // Delete the product using an API call
            await fetch(
                `https://6480412af061e6ec4d48e822.mockapi.io/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            // Refresh the product list
            fetch("https://6480412af061e6ec4d48e822.mockapi.io/products")
                .then((response) => response.json())
                .then((data) => setProducts(data))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/products/new")}>
                + Add New Product
            </button>
            <div>
                <br />
                <br />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        navigate(`/products/${product.id}/edit`)
                                    }>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
