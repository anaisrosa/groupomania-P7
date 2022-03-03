const jwt = require('jsonwebtoken');

exports.userCheck = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decodedToken)  {
            throw 'Invalid token';
        } else {
            next();
        }
    } catch (err) {
        
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};


exports.adminCheck = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const isAdmin = decodedToken.userIsAdmin;  
        if (!isAdmin) {
            throw 'User is not Admin';
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            error: new Error('Invalid request!'),
            message: err,
        });
    }
};



