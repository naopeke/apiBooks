const { pool } = require('../database');

const registerUser = async (req, res, next) => {
    try {
        let sql = 'INSERT INTO user (name, last_name, email, photo, password) ' +
                'VALUES ("' + req.body.nombre + '", "'+
                req.body.apellido + ' ", "' +
                req.body.email + ' ", "' +
                req.body.url + ' ", "' +
                req.body.password1 + '")';
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


const authenticateUser = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM apiBooks.user ' +
                    'WHERE email="' + req.body.email +
                    '" AND password="' + req.body.password + '"';
        let [result] = await pool.query(sql);
        console.log(result);

        //si existe este bbdd, send this userdata
        if(result.length > 0){
            const userData = {
                id_user: result[0].id_user,
                name: result[0].name,
                last_name: result[0].last_name,
                email: result[0].email,
                photo: result[0].photo
            };
            res.send(userData);
            console.log('Login ok');
        } else {
            res.send('No coincide el correo y la contraseña. Por favor, inténtelo de nuevo.')
        }
    
    } catch(err){
            console.log(err);
            next(err);
    }
    }




module.exports = {
    registerUser,
    authenticateUser
};