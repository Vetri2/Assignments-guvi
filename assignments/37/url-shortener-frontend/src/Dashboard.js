import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [dailyCount, setDailyCount] = useState(0);
    const [monthlyCount, setMonthlyCount] = useState(0);

    useEffect(() => {
        const fetchURLCounts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/url-counts"
                );
                setDailyCount(response.data.dailyCount);
                setMonthlyCount(response.data.monthlyCount);
            } catch (error) {
                console.error(error);
            }
        };

        fetchURLCounts();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total URLs Created Today: {dailyCount}</p>
            <p>Total URLs Created This Month: {monthlyCount}</p>
        </div>
    );
};

export default Dashboard;
