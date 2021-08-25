const UserQuery = require('../data/userquery');
const validator = require('../validators/validator');

class User {
    constructor() {
        this.userQuery = new UserQuery();
    }

    getUserList = async () => {
        const list = await this.userQuery.getUserList();
        return {
            status: true,
            data: list
        }
    }

    getUserDetails = async (id) => {
        const errors = validator.NumberValidator("id", id, true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        } 
        else {
            const list = await this.userQuery.getUserDetails(id);

            return {
                status: true,
                data: list
            }
        }
    }

    saveUser = async (id, firstName, lastName, age, gender) => {
        let errors = [];
        const errors1 = validator.StringValidator("firstName", firstName, true, "text", 3, 50);
        const errors2 = validator.StringValidator("lastName", lastName, true, "text", 3, 50);
        const errors3 = validator.NumberValidator("age", age, true);
        const errors4 = validator.StringValidator("gender", gender, true, "text", 4, 6);

        errors = [...errors1, ...errors2, ...errors3, ...errors4];

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        } 
        else {
            const newId = await this.userQuery.saveUser(id, firstName, lastName, age, gender);

            return {
                status: true,
                data: [{
                    id: newId,
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    gender: gender
                }]
            }
        }
    }

    deleteUser = async (id) => {
        const errors = validator.NumberValidator("id", id, true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        } 
        else {
            const deleteId = await this.userQuery.deleteUser(id);

            return {
                status: true,
                data: deleteId
            }
        }
    }
}

module.exports = User;