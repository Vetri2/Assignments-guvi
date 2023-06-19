import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [serviceRequestCount, setServiceRequestCount] = useState(0);
    const [leadCount, setLeadCount] = useState(0);
    const [contactCount, setContactCount] = useState(0);

    useEffect(() => {
        // TODO: Fetch counts of service requests, leads, and contacts from the API
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Service Requests: {serviceRequestCount}</p>
            <p>Leads: {leadCount}</p>
            <p>Contacts: {contactCount}</p>
        </div>
    );
};

export default Dashboard;
