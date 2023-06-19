import React, { useEffect, useState } from "react";

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        // Fetch contacts data from the backend API
        fetch("/api/contacts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error(error));
    }, [token]);

    const handleAddContact = () => {
        // Make an API request to add a new contact
        fetch("/api/contacts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "New Contact" }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the contacts state with the added contact
                setContacts([...contacts, data]);
            })
            .catch((error) => console.error(error));
    };

    const handleRemoveContact = (id) => {
        // Make an API request to remove a contact
        fetch(`/api/contacts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the contact from the contacts state
                    const updatedContacts = contacts.filter(
                        (contact) => contact.id !== id
                    );
                    setContacts(updatedContacts);
                } else {
                    console.error("Failed to remove contact");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleEditContact = (id, newName) => {
        // Make an API request to edit a contact
        fetch(`/api/contacts/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the contacts state with the edited contact
                const updatedContacts = contacts.map((contact) => {
                    if (contact.id === id) {
                        return { ...contact, name: newName };
                    }
                    return contact;
                });
                setContacts(updatedContacts);
            })
            .catch((error) => console.error(error));
    };

    // ... handle other functions

    return (
        <div>
            <h2>Contacts</h2>
            <button onClick={handleAddContact}>Add Contact</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleRemoveContact(contact.id)
                                    }>
                                    Remove
                                </button>
                                <button
                                    onClick={() =>
                                        handleEditContact(
                                            contact.id,
                                            "Updated Name"
                                        )
                                    }>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsPage;
