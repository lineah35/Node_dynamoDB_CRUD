const connection = require("../db"); //import simply.
const axios = require("axios"); //to call any http request; in this case, to fetch hp data

const TABLE_NAME = "harrypotter-api";

const getAllData = async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };
    const result = await connection.scan(params).promise(); //calling connection worked!
    console.log("result:", result);
    res.send(result);
  } catch (e) {
    console.log("Error:", e);
  }
};



const getSpecificData = async(req, res) => {
    try{
        const id = +(req.params.id); //everything comes in string in params
        console.log("id:", id);
        const params = { 
            TableName: TABLE_NAME,
            Key: {
                id
            }
        }
        console.log("params:", params);
    const result = await connection.get(params).promise();
    console.log(result);
    res.send(result);
    } catch (e) {
        console.log("Error:", e);
    }
};


const createData = async (req, res) => { //can be used for both recording and updating data
  const newData = req.body; //with hp-full-stack, it's the object 
    try {
    const params = {
      TableName: TABLE_NAME,
      Item: newData,
    };
    const result = await connection.put(params).promise();
    console.log("Result:", result);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};


const deleteData = async (req, res) => {
    const id = +(req.params.id);
    try{
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id
            }
        }
        const result = await connection.delete(params).promise();
        console.log("Result:", result);
        res.send("Data deleted.");
    } catch (e) {
        console.log(e);
    }
}

const recordData = async (req, res) => {
  try {
    const hpData = await axios.get(
      "http://hp-api.herokuapp.com/api/characters/students"
    );
    console.log("hpData:", hpData); //comes as object when called from backend
    let result;
    hpData.data.forEach(async (character, index) => {
      if (character.ancestry == "pure-blood") {
        // console.log("character:", character);
        character.id = index; //id should be number
        // console.log("character.id", character.id);
        const params = {
          TableName: TABLE_NAME,
          Item: character,
        };
        console.log("params:", params);
        result = await connection.put(params).promise(); //scan is to fetch from db; put is to create and update
        console.log("Purely pureblood:", result);
      }
    });
    res.send("data stored successfully");
  } catch (e) {
    console.log("error:", e);
  }
};

module.exports = { getAllData, createData, recordData, getSpecificData, deleteData };

//update, fetch specific data, delete data
