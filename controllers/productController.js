import instance from "../helpers/axiosInstance.js"

const productController = {

    getProduct: async (req, res) => {
        try {
            const response = await instance.get('https://dummyjson.com/products')
            res.status(200).send({'message':'Product List','data':response.data})
        } catch (error) {            
           res.status(401).send({'error':error}) 
        }        
    },

    getProductDetail: async (req, res) => {
        const {id} = req.params        
        try {
            const productDetail = await instance.get(`https://dummyjson.com/products/${id}`)
            res.status(200).send({'message':'Product Detail','data':productDetail.data})
        } catch (error) {
            res.status(401).send({'error':error}) 
        }
    },

    getAllProductCategories: async (req, res) => {
        try {
            const productCategories = await instance.get('https://dummyjson.com/products/categories')
            res.status(200).send({'message':'Product All Categories','data':productCategories.data})
        } catch (error) {
            res.status(401).send({'error':error}) 
        }
    },

    getAllProductCategories: async (req, res) => {
        try {
            const productCategories = await instance.get('https://dummyjson.com/products/categories')
            res.status(200).send({'message':'Product All Categories','data':productCategories.data})
        } catch (error) {
            res.status(401).send({'error':error}) 
        }
    },

    getproductsCategoryList: async (req, res) => {
        try {
            const productsCategoryList = await instance.get('https://dummyjson.com/products/category-list')
            res.status(200).send({'message':'Products Category','data':productsCategoryList.data})
        } catch (error) {
            res.status(401).send({'error':error}) 
        }
    }

}


export default productController