import jwt from 'jsonwebtoken'

// check whether the token is valid or not
const authMiddleware = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw new Error('Authorization token missing');

        // verufy the token using secret key
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decodedToken.userId
        next();
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        });
    }
}

export default authMiddleware