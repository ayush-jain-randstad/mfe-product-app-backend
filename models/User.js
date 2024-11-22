import { Sequelize, DataTypes } from "sequelize";
import connectDB from "../config/connectdb.js"

const User = connectDB.define('users', {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    remember_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  }, {
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'updated_at' 
    
  });
  

export default User