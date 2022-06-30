const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require("../config/database");
require('dotenv').config();


const register= async(req,res)=>{
    const {username,email,password} = req.body;
    const salt = await bcrypt.genSalt(10)   
     const encryptedPassword = await  bcrypt.hash(password, salt)
     try {
        const  data  =  await db.query(`SELECT * FROM employees.users WHERE email= $1;`, [email]); //Checking if user already exists in our database
        const  arr  =  data.rows;
        if (arr.length  !=  0) {
        return  res.status(400).json({
        error: "Email already exists",
        });
        }else {
            var  flag  =  1; //Declaring a flag
            //Inserting data into the database
           db.query(`INSERT INTO employees.users (username, email, password) VALUES ($1,$2,$3);`, [username, email, encryptedPassword], (err) => {
            if (!err) {
                return res.status(200).json({ message: "Successfully Registered" });
            }
            if (err) {
            flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return  res.status(500).json({
            error: "Database error"
            })
            }
            else {
                flag  =  1;
                res.status(200).send({ message: 'User added to database, not verified' });
                }
                })
                if (flag) {
                const  token  = jwt.sign( //Signing a jwt token
                {
                email: email
                },
                process.env.SECRET_KEY
                );
                };
                }
                }
                
                catch (err) {
                console.log(err);
                res.status(500).json({
                error: "Database error while registring user!", //Database connection error
                });
                };
                }

                module.exports = {
                    register
                  };