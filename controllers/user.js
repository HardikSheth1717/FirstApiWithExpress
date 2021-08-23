const userQuery = require('../data/userquery');

module.exports.getUserList = (request, response, next) => {
    return userQuery.getUserList().then(data => {
        response.json(data);
        return response.end();
    });
}

module.exports.getUserDetails = (request, response, next) => {
    const userId = parseInt(request.params.id);

    if (userId > 0) {
        return userQuery.getUserDetails(userId).then(data => {
            return response.json(data[0]);
        });
    }
}
 
module.exports.saveUser = (request, response, next) => {
    const postedData = request.body;

    return userQuery
        .saveUser(postedData.id, postedData.firstName, postedData.lastName, postedData.age, postedData.gender).then(data => {
            return response.json({
                "status": true,
                "id": data
            });
        }).catch(error => {
            return response.json({
                "status": false,
                "id": 0
            });
        });
}

module.exports.deleteUser = (request, response, next) => {
    const userId = parseInt(request.params.id);

    if (userId > 0) {
        return userQuery.deleteUser(userId).then(data => {
            return response.json({
                "status": true,
                "id": userId
            });
        });
    } else {
        return response.json({
            "status": false,
            "id": userId
        });
    }
}