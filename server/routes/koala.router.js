const { application, response } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');

// DB CONNECTION


// GET
koalaRouter.get ('/', (req,res) => {
    console.log('in GET /koalas');
    let sqlQuery = `
        SELECT * FROM "koalas"
            ORDER BY "id";
    `
    pool.query(sqlQuery)
    .then((dbRes) => {
        let koalasFromDataTable = dbRes.rows;
        res.send(koalasFromDataTable);
    })
    .catch((dbErr) => {
        console.log('Error in GET /koalas: ', dbErr);
        res.sendStatus(500)
    })
})

// POST
koalaRouter.post('/', (req, res)=>{
    console.log('POST /koalas');
    console.log(req.body);

    let sqlQuery =`
    INSERT INTO "koalas"
    ("name", "age","gender","ready_to_transfer","notes")
    VALUES
    ($1,$2,$3,$4,$5);
    `
    let sqlValues = [req.body.name,req.body.age,req.body.gender,req.body.ready_to_transfer,req.body.notes];
    pool.query(sqlQuery,sqlValues)
    .then((response) =>{
        res.sendStatus(200);
    })
    .catch((response)=>{
        console.log('something broke in post', response);
        res.sendStatus(500)
    })
})

// PUT

koalaRouter.put('/./:id', (req,res) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    let idToUpdate = req.params.id;
    let koalaReady = req.body.ready_to_transfer;

    let sql
})

// DELETE

module.exports = koalaRouter;