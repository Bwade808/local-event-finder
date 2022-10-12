module.exports = {
    dev: {
        connectionString: "postgres://postgres:postgrespw@localhost:49156/events",
        port: '8002'
    },
    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + "?ssl=true", 
        port: process.env.PORT
    }
}