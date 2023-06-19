import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductForm = ({ initialValues, onSubmit }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        price: Yup.number()
            .required("Price is required")
            .positive("Price must be a positive number"),
        description: Yup.string().required("Description is required"),
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <Field
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                        />
                        <ErrorMessage
                            name="price"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Field
                            as="textarea"
                            className="form-control"
                            id="description"
                            name="description"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default ProductForm;
