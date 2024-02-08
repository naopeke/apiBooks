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


const addBooks = async (req, res, next) => {
    try {
        let sql = 'INSERT INTO apiBooks.book (id_user, title, type, author, price, photo) ' +
                'VALUES ("' + req.body.id_user + '", "'+
                req.body.title + ' ", "' +
                req.body.type + ' ", "' +
                req.body.author + ' ", "' +
                req.body.price + ' ", "' +
                req.body.photo + '")';
        console.log(sql);
        let [result] = await pool.query(sql);   
        console.log(result);

        if(result.insertId){
        res.send(String(result.insertId));
        } else {
        res.send('-1');
        }

    } catch(err){
        console.log(err);
        next(err);
    }
}


const updateBooks = async (req, res, next) => {
    try {
        console.log(req.body);
        let params = [req.body.id_user,
                    req.body.title,
                    req.body.type,
                    req.body.author,
                    req.body.price,
                    req.body.photo,
                    req.body.id_book];

        let sql = 'UPDATE apiBooks.book SET id_user = COALESCE(?, id_user), ' +
        'title = COALESCE(?, title), ' +
        'type = COALESCE(?, type) , ' +
        'author = COALESCE(?, author) , ' +
        'price = COALESCE(?, price), ' +
        'photo = COALESCE(?, photo) ' +
        'WHERE id_book = ?';
          

        console.log(sql);
        let [result] = await pool.query(sql, params);
            res.send(result);
            
    } catch(err){
        console.log(err);
    }
}




const deleteBooks = async (req, res, next) => {
    try {
        let params = [req.body.id_book];
        let sql = `DELETE FROM book WHERE id_book = ?`
        console.log(sql);
        let [result] = await pool.query(sql, params);
            res.send(result);

    } catch(err){
        console.log(err);
    }
}




module.exports = {
    getBooks,
    addBooks,
    updateBooks,
    deleteBooks
};