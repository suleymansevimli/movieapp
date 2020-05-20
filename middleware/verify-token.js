const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.params.token
    if (token) {
        console.log(token)
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: "false",
                    message: "Failed to authenticate"
                })
            } else {
                req.decode = decoded
                next()
            }
        })
    } else {
        res.json({
            status: "fail",
            message: "token not provided"
        })
    }
}