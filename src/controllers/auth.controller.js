const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/config");
const db = require("../db/db");

//POST
exports.register = (req,res) => {
    const {nombre, email, telefono, password, cuil} = req.body;
    const hashedPassword  = bcrypt.hashSync(password,8);
    const sql = "INSERT INTO clientes (nombre, email, telefono, password, cuil) VALUES (? , ? , ? , ? , ?)";
    const values = [nombre, email, telefono, hashedPassword, cuil];
    db.query(sql, values, (err,result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        } 
        const token = jwt.sign({user: email},config.secretKey,{expiresIn:config.tokenExpiresIn});
        res.status(201).send({auth:true,token});
    });
};

//POST
exports.login = (req,res) => {
    const {email, password} = req.body;
    const sql = "SELECT password FROM clientes where email = ? ";
    db.query(sql, [email], (err,result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        }
        if(result=='') return res.status(404).send(`El email ${email} no se encuentra registrado`);
        const passwordIsValid = bcrypt.compareSync(password,result[0].password);
        if (!passwordIsValid) return res.status(401).send({auth:false, token:null});
        const token = jwt.sign({user: email},config.secretKey,{expiresIn: config.tokenExpiresIn});
        res.status(200).send({auth:true,token});
    });
};

//GET
exports.cliente = (req,res) => {
    const email =  req.user;
    const sql = "SELECT nombre, email, telefono, cuil FROM clientes where email = ? ";
    db.query(sql,[email],(err,result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        }
        res.json(result);
    });
};
