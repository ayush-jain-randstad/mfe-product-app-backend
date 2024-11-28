import instance from "../helpers/axiosInstance.js"
import bcrypt from 'bcrypt'
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const authController = {

    login: async (req, res) => {
        const {email, password} = req.body
        console.log(email);
        if(email && password) {
            const user = await User.findOne({
                where:{email : email}
            })
            if(user != null){
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if((email === user.email) && isPasswordValid) {
                    const token = jwt.sign({ userId: user.id} , "process.env.JWT_SECRET_KEY" , { expiresIn: '5d' });
                    res.send({'status':200, 'message':'Login successfully','token':token, userDetails:user})
                } else {
                    res.send({'status':201, 'message':'Email or password does not match'})
                }
            } else {
                res.send({'status':201, 'message':'Email is not valid'})
            }
        } else {
            console.log('email or password not available');
            
        }
        
    },

    register: async(req, res) => {
        const {email, password, name, confirmPassword} = req.body
        console.log("req body", email, password, name, confirmPassword);

        if (password !== confirmPassword) {
            res.send({'status':201, 'message':'Password does not match'})
        } else {
            if(email && password && name && confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                console.log(hashedPassword);
                const user = await User.create({email:email, password:hashedPassword, name:name})
                if(user) {
                    const token = jwt.sign({ userId: user.id} , 'process.env.JWT_SECRET_KEY' , { expiresIn: '5d' });
                    res.send({'status':200, 'message':'Register successfully','token':token, userDetails:user})
                }
            }else {
                    res.send({'status':400, 'message':'Email already exist'})
                }
        }


        }
    }


export default authController