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


// PUT


// DELETE

module.exports = koalaRouter;