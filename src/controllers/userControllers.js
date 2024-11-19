import User from '../models/user.js';
import Task from '../models/task.js';
import Category from '../models/category.js';
import asyncHandler from '../utils/asyncHandler.js' //asyncHandler
import ApiError from '../utils/ApiError.js'
import {  Sequelize } from 'sequelize';
import sequelize from '../database/sequelize.js'
export const createUser = asyncHandler(async(req,res)=>{
    const {name,email,isAdmin} = req.body;
    if([name, email].some((item) => !item || item.trim() === '')){
        throw new ApiError(400,'All fields are required')
    }

    const ifExists = await User.findOne({where:{email}});

    if(ifExists){
         throw new ApiError(400,'user already Exists')
    }
    const user = await User.create({name,email,isAdmin},{fields:['name','email','isAdmin']});

    const userCreated = await User.findOne({where:{id:user.id}});

    res.status(201).json({message:'user created',userCreated})
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.findAll({
        where: {
            [Sequelize.Op.and]: [
                { id: { [Sequelize.Op.gte]: 3 } },
                { isAdmin: { [Sequelize.Op.ne]: null } }
            ]
        },
        order: [['id', 'DESC']] // Order by id in descending order
    });

    res.status(200).json({ message: 'Users fetched successfully', allUsers });
});


export const createUserTasks = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { title, description, name, email, isAdmin } = req.body;

    if ([title, description].some((item) => !item || item.trim() === '')) {
        throw new ApiError(400, 'Please enter title and description');
    }

    const t = await sequelize.transaction(); // Start a transaction

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { email }, transaction: t });

        if (!user) {
            // Create user with task using transaction
            user = await User.create(
                {
                    name,
                    email,
                    isAdmin,
                    Tasks: [{ title, description, categoryId }],
                },
                {
                    include: [{ model: Task,as: 'Tasks' }], // Ensure association is included
                    transaction: t, // Use transaction
                }
            );
        } else {
            // Check if the task already exists
            const taskExists = await Task.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { title },
                        { description },
                        { userId: user.id },
                    ],
                },
                transaction: t,
            });

            if (taskExists) {
                throw new ApiError(400, 'Task already exists');
            }

            // Create the task
            await Task.create(
                {
                    title,
                    description,
                    userId: user.id,
                    categoryId,
                },
                { transaction: t }
            );
        }

        await t.commit(); // Commit transaction
        res.status(201).json({
            message: user.isNewRecord ? 'User and task created successfully' : 'Task created successfully',
        });
    } catch (error) {
        await t.rollback(); // Rollback transaction on error
        console.error(error);
        throw new ApiError(500, 'Unexpected error occurred');
    }
});


export const selectUserWithTask = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    if(id === '' || id === null){   
        throw new ApiError(400,'please send valid user Id')
    }

    const user = await User.findOne({
        include: [{
            model: Task,
            include:[{
                model:Category,
                required:false,
                right: true
            }]
        }],
        where: { id },
      });

    if(!user){
        throw new ApiError(400,'user not found')
    }

    res.status(200).json({message:'user fetched successfully',user})
})

export const createCategories = asyncHandler(async (req,res)=>{
    const {name} = req.body;

    if(name === '' || name === null){
        throw new ApiError(400,'please enter name')
    }

    const categoryExists = await Category.findOne({where:{name}});

    if(categoryExists){
        throw new ApiError(400,'category already exists')
    }

    const category = await Category.create({name});

    res.status(201).json({message:'category created',category})
})