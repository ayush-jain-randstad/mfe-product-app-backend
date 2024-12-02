import { Sequelize, DataTypes } from "sequelize";
import connectDB from "../config/connectdb.js"
import User from "./User.js";

const RefreshToken = connectDB.define('refresh_tokens', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    user_id : {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    refresh_token : {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},
{
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });

  RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export default RefreshToken