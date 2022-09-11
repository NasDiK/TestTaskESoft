const bcrypt = require('bcryptjs');
const config = require('../knexfile');
const db = require('knex')(config.development);
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id,lastname)=>{
    const payload = {
        id,lastname
    };

    return jwt.sign(payload,secret,{});
};

class AuthController {
    async login(req, res) {
        try {
            const {login,password} = req.body;
            let users = await db('users').select('*').where('login',login);
            if(users.length === 0) res.status(400).json({message:'Login doesn\'t exist'});
            else if (!bcrypt.compareSync(password, users[0].password))
                res.status(400).json({message: 'Incorrect password'});
            else {
                const token = generateAccessToken(users[0].id,users[0].lastname);
                res.status(200).json({token});
            }

        } catch (err) {
            console.log(err);
            res.status(400).json({message:'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db('users').select('*').where('chief_id',req.user.id);
            res.status(200).json({list:users});
        } catch (err) {
            console.log(err);
            res.status(400).json({message:'Request error'})
        }
    }
}

module.exports = new AuthController();