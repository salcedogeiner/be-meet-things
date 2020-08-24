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

try {
    console.log('conectando');
    client.connect().catch(r => {console.log(r);});    
} catch (err) {
    console.log(err);;   
}

module.exports = client;