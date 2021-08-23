const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.CONFIGMAP_DATABASE_USER_KEY,
  password: process.env.CONFIGMAP_DATABASE_PASSWORD_KEY,
  host: process.env.CONFIGMAP_DATABASE_HOST_KEY,
  port: process.env.CONFIGMAP_DATABASE_PORT_KEY,
  database: process.env.CONFIGMAP_DATABASE_NAME_KEY,
});
console.log(`This app is using seeded database. See Redhat CVE-2017-11499 for NodeJS`);

/*  --- DO NOT  REMOVE ----
    //Live PostgreSQL instantiated connection test to Openshift PostgreSQL
    //[DEACTIVATED UNTIL READY FOR USE]
    pool.connect();
    //test that thIS app is connected to the PostgreSQL database.
    pool.query('SELECT NOW()', (err, res) => {
    if(!err){
      console.log("successfully connected to PostgreSQL database!");
    }else{
      console.log(err.message);
    }
    })
*/

module.exports = pool;
