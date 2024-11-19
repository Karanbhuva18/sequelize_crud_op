

import sequelize from './sequelize.js';
import  User from '../models/user.js';
import  Task from '../models/task.js';
import  Category from '../models/category.js';
import  Comment from '../models/comment.js';

User.hasMany(Task,{foreignKey:'userId',onDelete: 'CASCADE' ,as: 'Tasks'});
Task.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Task,{foreignKey:'categoryId'});
Task.belongsTo(Category,{foreignKey:'categoryId'});

Task.hasMany(Comment,{foreignKey:'taskId'});
Comment.belongsTo(Task,{foreignKey:'taskId'});


const DB_Connection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force:false});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {DB_Connection};