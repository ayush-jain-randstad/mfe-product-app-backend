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

    register: async(req, res) => {
        const {email, password, name, confirmPassword} = req.body
        console.log(email, password, name, confirmPassword)
        if (password !== confirmPassword) {
            response.sendUnauthorized(res, 'Password does not match')
        } else {
            if(email && password && name && confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await User.create({email:email, password:hashedPassword, name:name})
                if(user) {
                    const token = jwt.sign({ userId: user.id} , process.env.JWT_SECRET_KEY , { expiresIn: '5d' });
                    return res.send({'status':200, 'message':'Register successfully','token':token, userDetails:user})
                }
            } else {
                 return response.sendError(res,'Email already exist')
                }
        }
    }
}


export default authController