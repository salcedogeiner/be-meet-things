var express = require('express');
var router = express.Router();
var client = require('./conection');

/* GET conferences
 * @query param id 
 */
router.get('/', function(req, res, next) {
    try {
        // client.connect().catch(r => {console.log(r);});
        console.log('entro?');
        client.query('SELECT * FROM conference_info where state = $1::text',['E'], function (err, result) {
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

/* GET conferences by id
 * @param id 
 */
router.get('/:id', function(req, res, next) {
    // Find and return record by id param
    try {
        // client.connect().catch(r => {console.log(r);});
        console.log('entro?');
        client.query('SELECT * FROM conference_info where id=$1::text',[req.params.id], function (err, result) {
        console.log(result);
        if (err) {
            res.status(400).send(err);       
        } else {
            res.json(result.rows);
        }       
        client.off(); 
    });
    } catch (err) {
        res.status(400).send(err);   
    }   
});

/* POST conferences */
router.post('/', function(req, res, next) {
     console.log(req);
    let conference = req.body;
    try {
        client.query(
            "insert into conference_info (id, title, location, state, quota) values (nextval('conference_info_id_seq'),$1::text,$2::text,$3::text,$4)",
            [
                conference.title,
                conference.location,
                conference.state,
                conference.quota
            ],             
            function (err, result) {
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

/* POST conferences  attendant*/
router.post('/attendant', function(req, res, next) {
    console.log(req);
   let attendant = req.body;
   try {
       client.query(
           "insert into user_conference (uid, cid) values ($1::text,$2)",
           [
                attendant.uid,
                attendant.cid,
           ],             
           function (err, result) {
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
