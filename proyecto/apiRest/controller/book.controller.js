const { pool } = require('../database');

// Sobre SQL injection https://www.w3schools.com/sql/sql_injection.asp
// How to protect https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
// Sobre placeholders https://docs.aveva.com/bundle/pi-interface-for-relational-database-rdbms-via-odbc/page/1017229.html
//https://stackoverflow.com/questions/35600813/when-to-use-and-as-placeholders-in-node-mysql-for-building-a-query
//   let sql = `SELECT * FROM book WHERE id_user = ?`;

const getBooks = async (req, res, next) => {
    // params
    let params = [];
   
    // si existe id_user, buscar con id_user 
    if (req.query.id_user) {
        params.push(req.query.id_user);
        sql = 'SELECT * ' +
        'FROM apiBooks.book ' +
        'JOIN apiBooks.user ON apiBooks.user.id_user = apiBooks.book.id_user ' +
        'WHERE apiBooks.book.id_user = ?';

        // si existe id_book tambien, buscar con id_user y id_book
        if (req.query.id_book) {
            params.push(req.query.id_book);
            sql = 'SELECT * ' +
            'FROM apiBooks.book ' +
            'JOIN apiBooks.user ON apiBooks.user.id_user = apiBooks.book.id_user ' +
            'WHERE apiBooks.book.id_user = ? AND apiBooks.book.id_book = ?';
        }
    }

    try {
        console.log(sql);
        let [result] = await pool.query(sql, params);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}




module.exports = {
    getBooks
};