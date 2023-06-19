import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const ProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const apiUrl = "http://localhost:3004/products";

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiUrl);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addProduct = async (values, { resetForm }) => {
        try {
            await axios.post(apiUrl, values);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const editProduct = async (values, { resetForm }) => {
        try {
            await axios.put(`${apiUrl}/${selectedProduct.id}`, values);
            fetchProducts();
            setSelectedProduct(null);
            resetForm();
        } catch (error) {
            console.error("Error editing product:", error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div>
            <h2>Product Management</h2>
            <div>
                <ProductForm
                    initialValues={
                        selectedProduct || {
                            name: "",
                            price: "",
                            description: "",
                        }
                    }
                    onSubmit={selectedProduct ? editProduct : addProduct}
                />
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEdit(product)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => deleteProduct(product.id)}>
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

export default ProductCrud;
