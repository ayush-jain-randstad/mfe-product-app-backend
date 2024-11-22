import { Sequelize } from "sequelize";

const connectDB = new Sequelize(
    'mfe-product-app', 
    'root',      
    '',      
    {
      host: 'localhost',      
      dialect: 'mysql',       
    }
  );
  
  connectDB.authenticate().then(() => {
    console.log('connection successful');    
  }).catch((error) => { 
    console.error('connection failed', error);
    
  })

  export default connectDB