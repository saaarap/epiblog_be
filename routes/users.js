const express = require('express');
const userModel = require('../models/user');
const user = express.Router();
const bcrypt = require('bcrypt')

user.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            statusCode: 200,
            users 
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});

user.post('/users/add', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)



    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        //qui deve avvenire il crypt
        role: req.body.role
    });
    try {
        const user = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            message: "Utente salvato con successo",
            payload: user
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});

user.patch('/users/up/:userId', async (req, res) => {
    const { userId } = req.params;
    const userExists = await userModel.findById(userId);
    if (!userExists) {
        return res.status(404).send({
            statusCode: 404,
            message: "Questo utente non esiste"
        });
    }
    try {
        const userToUpdate = req.body;
        const optionUser = { new: true };
        const result = await userModel.findByIdAndUpdate(userId, userToUpdate, optionUser);
        res.status(200).send({
            statusCode: 200,
            message: "Utente modificato con successo",
            result
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});

user.delete('/users/del/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "Utente già eliminato"
            });
        }
        res.status(200).send({
            statusCode: 200,
            message: "Eliminato con successo!"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});

module.exports = user;