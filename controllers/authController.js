import instance from "../helpers/axiosInstance.js"
import bcrypt from 'bcrypt'
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import response from "../helpers/response.js";

const authController = {

    login: async (req, res) => {
        const {email, password} = req.body
        if(email && password) {
            let user = await User.findOne({
                where:{email : email}
            })
            if(user != null){
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if((email === user.email) && isPasswordValid) {
                    const token = jwt.sign({ userId: user.id} , process.env.JWT_SECRET_KEY , { expiresIn: '5d' });
                    user.token = token
                    res.status(200).send({'status':200, 'message':'Login successfully','token':token, userDetails:user})
                } else {
                    return response.sendUnauthorized(res,'Email or password does not match')
                }
            } else {
                return response.sendUnauthorized(res,'Email is not valid')
            }
        } else {
            return response.sendUnauthorized(res,'Email or password not available')
        }
        
    },


}

export default authController