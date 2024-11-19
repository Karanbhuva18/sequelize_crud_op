// src/models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('name');
            return rawValue? rawValue.toUpperCase().trim() : null;
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
});

export default User;
