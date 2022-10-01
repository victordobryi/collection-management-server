"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = exports.deleteAllUsers = exports.deleteUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const users_1 = require("../models/users");
const createUser = async (req, res, next) => {
    const user = await users_1.Users.create(Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() }));
    return res.status(200).json({ message: 'User created successfully', data: user });
};
exports.createUser = createUser;
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await users_1.Users.findByPk(id);
    await users_1.Users.destroy({ where: { id } });
    return res.status(200).json({ message: `User ${id} deleted successfully`, data: deletedUser });
};
exports.deleteUser = deleteUser;
const deleteAllUsers = async (req, res, next) => {
    await users_1.Users.destroy({ where: {}, truncate: true });
    return res.status(200).json({ message: `All Users deleted successfully` });
};
exports.deleteAllUsers = deleteAllUsers;
const getAllUsers = async (req, res, next) => {
    const allUsers = await users_1.Users.findAll();
    return res.status(200).json({ message: 'Users fetched successfully', data: allUsers });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await users_1.Users.findByPk(id);
    return res.status(200).json({ message: `User fetched successfully`, data: user });
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    await users_1.Users.update(Object.assign({}, req.body), { where: { id } });
    const updatedUser = await users_1.Users.findByPk(id);
    return res.status(200).json({ message: `User ${id} updated successfully`, data: updatedUser });
};
exports.updateUser = updateUser;
