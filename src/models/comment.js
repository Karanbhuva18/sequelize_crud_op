import { DataTypes } from 'sequelize';
import Task from './task.js';
import sequelize from '../database/sequelize.js';

const Comment = sequelize.define('Comment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    taskId:{
        type:DataTypes.INTEGER,
        reference:{
            model:Task,
            key:'id'
        }
    }
})

export default Comment;