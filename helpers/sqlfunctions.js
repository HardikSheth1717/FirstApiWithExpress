const mysqlPool = require('./sqlconnection');

class SqlFunctions {
    constructor() { }

    static Get = async obj => {
        const [data] = await mysqlPool.execute(`
                SELECT ${obj.columns.join(',')}
                FROM ${obj.table}
            `);

        return data;
    }

    static GetById = async obj => {
        const [data] = await mysqlPool.execute(`
            SELECT ${obj.columns.join(',')}
            FROM ${obj.table}
            WHERE ${obj.keyName} = ?
        `, [obj.keyValue]);

        return data;
    }

    static Create = async obj => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);
        let placeHolders = data.map(element => {
            return "?";
        })

        const [inserted] = await mysqlPool.execute(`
            INSERT INTO ${obj.table} (${columns.join(',')})
            VALUES (${placeHolders.join(',')})`, data);

        return parseInt(inserted.insertId);
    }

    static Update = async obj => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);

        const [updated] = await mysqlPool.execute(`
            UPDATE ${obj.table} SET ${columns.join(' = ?, ')} = ? WHERE ${obj.keyName} = ?`,
            [...data, obj.keyValue]);

        return parseInt(updated.affectedRows) > 0 ? parseInt(obj.keyValue) : 0;
    }

    static Delete = async obj => {
        const [data] = await mysqlPool.execute(`
            DELETE FROM ${obj.table} WHERE ${obj.keyName} = ?`, [obj.keyValue]);

        return parseInt(data.affectedRows) > 0 ? parseInt(obj.keyValue) : 0;
    }

    static Execute = async query => {
        const [data] = await mysqlPool.execute(query);
        return data;
    }
}

module.exports = SqlFunctions;