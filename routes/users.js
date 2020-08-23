var express = require('express');
var router = express.Router();

// pg postgres db
const { Client } = require('pg');

// var connectionString = "postgres://ppyekznyzplmud:d6975b8e62b0ef6a1ac7c1a80ba6949807ca2c923fcaa409a6275982e36566d0@ec2-174-129-253-1.compute-1.amazonaws.com:5432/d1ud6crnr2ugce";
const client = new Client({
    host: 'ec2-174-129-253-1.compute-1.amazonaws.com',
    port: 5432,
    user: 'ppyekznyzplmud',
    password: 'd6975b8e62b0ef6a1ac7c1a80ba6949807ca2c923fcaa409a6275982e36566d0',
    database: 'd1ud6crnr2ugce',
    ssl: {
        rejectUnauthorized: false
      }
  })


/* GET users
 * @query param id 
 */
router.get('/', function(req, res, next) {
    try {
        client.connect().catch(r => {console.log(r);});
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
        client.connect().catch(r => {console.log(r);});
        console.log('entro?');
        client.query('SELECT * FROM user_info where uid=$1::text',[req.params.id], function (err, result) {
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
        client.connect().catch(r => {console.log(r);});
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
