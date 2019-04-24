var Pool = require('pg').Pool
var pool = new Pool({
  user: 'gyiklnogoftxaw',
  host: 'ec2-107-20-183-142.compute-1.amazonaws.com',
  database: 'd9jgpghedbvma3',
  password: '4ed2c78146de60f01e360a7dd390b3dbdee012f09d7e45cdd42dbd531ba46afe',
  port: 5432,
})


function getALL(request, response) {
    var id = request.param.user_ID;
    pool.query('SELECT * FROM user_info WHERE user_ID = ' + id, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

function getTemp(request, response) {
    var id = request.param.user_ID;
    pool.query('SELECT (user_ID, temperature, date_of_sensor) FROM user_info WHERE user_ID = ' + id, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

function getHum(request, response) {

}

module.exports = {
    getALL,
    getTemp
}