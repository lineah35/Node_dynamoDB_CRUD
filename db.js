const AWS = require('aws-sdk'); //to connect to db
require('dotenv').config(); //for the access key etc

AWS.config.update({
    region:process.env.DefaultRegion, 
    accessKeyId:process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})

function connection () {
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    return dynamoClient;
}

module.exports = connection();