import { DataTypes } from 'sequelize';
import User from './user.js';
import Category from './category.js';
import sequelize from '../database/sequelize.js';

const Task = sequelize.define('task',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
    },
    completed:{
        type:DataTypes.BOOLEAN,
        default:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id',
        }
    },
    categoryId:{
        type:DataTypes.INTEGER,
        references:{
            model:Category,
            key:'id'
        }
    }
})
export default Task;