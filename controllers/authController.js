import instance from "../helpers/axiosInstance.js"

const authController = {

    login: async (req, res) => {
        const {username, password} = req.body
        console.log(username);
        
    },


}

export default authController