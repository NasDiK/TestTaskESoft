const bcrypt = require('bcryptjs');
const config = require('../knexfile');
const db = require('knex')(config.development);
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id, lastname) => {
    const payload = {
        id, lastname
    };

    return jwt.sign(payload, secret, {});
};

class AuthController {
    async login(req, res) {
        try {
            const {login, password} = req.body;
            let users = await db('users').select('*').where('login', login);
            if (users.length === 0) res.status(400).json({message: 'Login doesn\'t exist'});
            else if (!bcrypt.compareSync(password, users[0].password))
                res.status(400).json({message: 'Incorrect password'});
            else {
                const token = generateAccessToken(users[0].id, users[0].lastname);
                res.status(200).json({
                    token,
                    id: users[0].id,
                    firstname: users[0].firstname,
                    lastname: users[0].lastname,
                    patronymic: users[0].patronymic
                });
            }

        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db('users').select('id', 'lastname', 'firstname', 'patronymic').where('chief_id', req.user.id);
            res.status(200).json({list: users});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Request error'})
        }
    }

    async getSubordinatesTask(req, res) {
        try {
            const tasks = await db('tasks').join('users', 'users.id', 'Fk_responsible_id').select('tasks.id', 'caption', 'description', 'createdAt', 'endsAt as endDate', 'refreshedAt', 'priority', 'status', 'Fk_responsible_id as responsible', 'users.firstname', 'users.lastname', 'users.patronymic').where('Fk_createdBy_id', req.user.id);
            res.status(200).json({list: tasks});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Request error'})
        }
    }

    async getOwnTasks(req, res) {
        try {
            const tasks = await db('tasks').select('id', 'caption', 'description', 'createdAt', 'endsAt as endDate', 'refreshedAt', 'priority', 'status', 'Fk_createdBy_id as createdBy').where('Fk_responsible_id', req.user.id);
            res.status(200).json({list: tasks});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Request error'})
        }
    }

    async updateTask(req, res) {
        try {
            const date = new Date();
            const result = await db('tasks').where('id', req.body.id).update({
                caption: req.body.caption,
                description: req.body.description,
                endsAt: req.body.endDate,
                refreshedAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                priority: req.body.priority,
                status: req.body.status,
                Fk_responsible_id: req.body.responsible,
            });
            res.sendStatus(200)
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Update task error'});
        }
    }

    async createTask(req, res) {
        try{
            const date = new Date();
            const getId = await db('tasks').max('id');
            const result = await db('tasks').insert({
                id:getId[0].max+1,
                caption: req.body.caption,
                description: req.body.description,
                endsAt: req.body.endDate,
                createdAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                priority: req.body.priority,
                status: req.body.status,
                Fk_responsible_id: req.body.responsible,
                Fk_createdBy_id:req.user.id,
            });
            res.sendStatus(200)
        }
        catch (e) {
            console.log(e);
            res.status(400).json({message:'Create task error'});
        }
    }
}

module.exports = new AuthController();