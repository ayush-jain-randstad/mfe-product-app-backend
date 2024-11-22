import { jwt } from "jsonwebtoken";
import User from "../models/User";

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
            return token
        } else {
            console.log('token is not available');
        }
        if(!token){
            res.send({'status':201, 'message': 'Token not available'})
        } else {
            try {
                const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
                req.user = User.findOne({
                    where : { id : userId },
                    attributes: { exclude: ['password'] }
                })
                next()
            } catch (error) {
                console.log('error',error);
                res.send({'status':201, 'message': 'Unauthorized Token'})                
            }
          
        }

    }
}

export default auth