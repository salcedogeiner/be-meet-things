var express = require('express');
var router = express.Router();
var client = require('./conection');
/* GET users
 * @query param id 
 */
router.get('/', function(req, res, next) {
    try {
        // client.connect().catch(r => {console.log(r);});
        console.log('entro?');
        client.query('SELECT * FROM user_info', function (err, result) {
        console.log(result);
        if (err) {
            res.status(400).send(err);       
        } else {
            res.json(result.rows);
        }     
          
    });
    } catch (error) {
    }
    // Return record by id query param
    
});

/* GET users by id
 * @param id 
 */
router.get('/:id', function(req, res, next) {
    // Find and return record by id param
    try {
        // client.connect().catch(r => {console.log(r);});
        console.log('entro?', req.params.id );
        client.query('SELECT * FROM user_info ui join user_role ur on ui.role_id = ur.id where ui.uid=$1::text',[req.params.id], function (err, result) {
        console.log(result);
        if (err) {
            res.status(400).send(err);       
        } else {
            res.json(result.rows);
        }       
        
    });
    } catch (err) {
        res.status(400).send(err);   
    }   
});

/* POST users */
router.post('/', function(req, res, next) {
     console.log(req);
    let user = req.body;
    try {
        // client.connect().catch(r => {console.log(r);});
        console.log('entro?');
        client.query(
            'insert into user_info (uid, name, email, role_id) values ($1::text,$2::text,$3::text,$4)',
            [
                user.uid,
                user.name,
                user.email,
                user.role_id
            ],             
            function (err, result) {
        console.log(result);
        if (err) {
            res.status(400).send(err);       
        } else {
            res.json(result.rows);
        }     
          
    });
    } catch (err) {
        res.status(400).send(err);  
    }   
});

function handleError(err) {
    console.log(err)
};

module.exports = router;
