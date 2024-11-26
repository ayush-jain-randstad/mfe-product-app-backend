import jwt from "jsonwebtoken";
import User from "../models/User.js";

// class auth {
//     checkUserAuth = () => {

//     }
// }

const auth = {
    checkUserAuth: (req, res, next) => {
        const {authorization} = req.headers
        let token;
        if(authorization && authorization.split(' ')[0] === "Bearer") {
            token = authorization.split(' ')[1];
        } else {
            res.status(401).send({'status':401,'message': 'Token not available'})
        }
        if(!token){
            res.status(401).send({'status':401,'message': 'Token not available'})
        } else {
            try {
                const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
                req.user = User.findOne({
                    where : { id : userId },
                    attributes: { exclude: ['password'] }
                })
                next()
            } catch (error) {
                res.status(401).send({'status':401,'message': 'Unauthorized Token'})

            }
          
        }

    }
}

export default auth



// refresh token functionality
// change status code
// create helper file for error handling
// cypress and jest test cases