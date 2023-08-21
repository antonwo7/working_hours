const path = require('path')

module.exports = {
    secret: "SECRET____",
    tokenExpiresIn: "24h",
    roleNames: {
        user: "USER",
        admin: "ADMIN"
    },
    paths: {
        report: path.resolve(__dirname) + "/files/",
        reportRouterDirUrl: "http://localhost:5002/report/download/",
        reportDirUrl: "https://ilusiak.loc/horario/server/files/",
        reportTemplate: path.resolve(__dirname) + "/files/template.xlsx"
    }
}