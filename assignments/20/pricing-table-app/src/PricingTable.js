import React from "react";

const PricingTable = () => {
    const plans = [
        {
            name: "Basic",
            price: "$9.99",
            features: ["Feature 1", "Feature 2", "Feature 3"],
        },
        {
            name: "Pro",
            price: "$19.99",
            features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        },
        {
            name: "Premium",
            price: "$29.99",
            features: [
                "Feature 1",
                "Feature 2",
                "Feature 3",
                "Feature 4",
                "Feature 5",
            ],
        },
    ];

    return (
        <div className="container">
            <div className="row">
                {plans.map((plan, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <div className="card-header bg-primary text-white">
                                <h3 className="my-0">{plan.name}</h3>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title pricing-card-title">
                                    {plan.price}
                                </h2>
                                <ul className="list-unstyled mt-3 mb-4">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            className={
                                                index === 0 ? "text-muted" : ""
                                            }
                                            key={index}>
                                            <span className="fa-li">
                                                {index === 0 ? (
                                                    <i className="fas fa-check"></i>
                                                ) : (
                                                    <i className="fas fa-times"></i>
                                                )}
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn btn-lg btn-block btn-primary">
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;
