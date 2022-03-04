const responseModel = {
    sucess: false,
    data: [],
    errors: []
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}

        return res.json(response)
    },

    async login(req, res) {
        const response = {...responseModel}

        return res.json(response)
    }
}