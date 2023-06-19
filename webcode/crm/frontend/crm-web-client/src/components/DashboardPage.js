// components/DashboardPage.js

import React, { useEffect, useState } from "react";

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((response) => response.json())
            .then((data) => setDashboardData(data))
            .catch((error) =>
                console.error("Error fetching dashboard data:", error)
            );
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Service Requests: {dashboardData.serviceRequests}</h3>
                <h3>Leads: {dashboardData.leads}</h3>
                <h3>Contacts: {dashboardData.contacts}</h3>
            </div>
        </div>
    );
};

export default DashboardPage;
