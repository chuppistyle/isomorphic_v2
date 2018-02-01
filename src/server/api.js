/**
 * Created by Anton on 25.01.2018.
 */
import React from 'react';
import mysql from 'mysql';
import { db_config } from './../config/db_config';

const LOAD_QUERY = 'CALL test_table_select_all()';
const ADD_QUERY = 'CALL test_table_insert(?)';
const UPDATE_QUERY = 'CALL test_table_update(?, ?)';
const REMOVE_QUERY = 'CALL test_table_delete(?)';

const SendJSON = (res, data) =>
{
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 3));
    res.end();
};


const HandleQuery = (query, post, callback) =>
{
    try
    {
        const connection = mysql.createConnection(db_config);
        connection.connect();
        connection.query(query, post, (error, result) => {
            //if (error) throw error;
            if (error) SendJSON(res, {status: 1, error: error.message});
            callback(result);
        });
        connection.end();
    }
    catch (e)
    {
        SendJSON(res, {status: 1, error: e.message});
    }
};

const CheckID = (req) =>
{
    if (!(req.query.id > 0))
    {
        SendJSON(res, {status: 1, error: "Bad ID"});
    }
};

const CheckValue = (req) =>
{
    if (!(req.query.value > 0))
    {
        SendJSON(res, {status: 1, error: "Bad value"});
    }
};

const Load = (req, res) => {
    HandleQuery(LOAD_QUERY, null, (result) => {
        const items = {};
        result[0].forEach(elem => items[elem.id] = elem);
        SendJSON(res, {status: 0, items: items})
    });
};

const Add = (req, res) => {
    CheckValue(req);
    HandleQuery(ADD_QUERY, req.query.value, (result) => SendJSON(res, {status: 0, item: result[0][0]}));
};

const Update = (req, res) =>
{
    CheckID(req);
    CheckValue(req);
    HandleQuery(
        UPDATE_QUERY, [ req.query.id, req.query.value ],
        (result) => SendJSON(res, {status: 0, item: result[0][0]})
    );
};

const Remove = (req, res) =>
{
    CheckID(req);
    HandleQuery(REMOVE_QUERY, req.query.id, (result) => SendJSON(res, {status: 0, id: req.query.id}));
};

const API_METHODS = {
    load: Load,
    add: Add,
    update: Update,
    remove: Remove
};

const API = (req, res) =>
{
    if (req.query && req.query.type && API_METHODS[req.query.type])
    {
        API_METHODS[req.query.type](req, res);
    }
    else
    {
        res.write('Type not specified or unknown type');
        res.end();
    }
};

export default API;
