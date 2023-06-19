// config.js

module.exports = {
    port: 5000,
    jwtSecret: "your_jwt_secret_key",
    databaseURL: "mongodb://localhost/crm-database",
    emailConfig: {
        service: "your_email_service",
        username: "your_email_username",
        password: "your_email_password",
    },
};
