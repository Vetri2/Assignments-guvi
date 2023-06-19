import React, { useEffect, useState } from "react";

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // Fetch contacts data from the backend API
        fetch("/api/contacts")
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsPage;
