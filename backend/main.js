const express = require('express')
const app = express()
const port = 3000
const db = require("./db.js")

app.use(express.json())


const getUser = async ()=> {
    const users = await db.query('select * from tableone');
    console.log(users.rows)
    return users.rows;
};

const newUser = async (body)=> {
    const {title, author, price, amount} = body
    
    const newUser = await db.query(`insert into tableone values (default, $1, $2, $3, $4)`,[title, author, price, amount]);
    console.log("saaa")
    return newUser;
};

const deleteUser = async (body) => {
    const id = body.id;
    const deleteUser = await db.query(`delete from tableone where id = $1`,[id]);
    console.log("s");
    return deleteUser;
};

const updateUser = async (body) => {
    // const id = body.id;
    const {id, column, meaning} = body;

    if(id == "undefinded") {
        console.log("NOT")
    }
    const updateUser = await db.query(`update tableone set $2 = $3 where id = $1`,[id, column, meaning]);
    console.log("GOOD");
    return updateUser;
};

app.get('/', (req, res) => {
    const result = getUser();
    return res.json(result);

});

app.post('/post',(req, res) => {
    const result = newUser(req.body);
    return res.send(result)
});

app.delete('/delete',(req, res) => {
    const result = deleteUser(req.body);
    return res.send(result);
});

app.put('/put', (req,res) => {
    const result = updateUser(req.body);
    return res.send(result);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})