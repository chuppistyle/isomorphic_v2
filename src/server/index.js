/**
 * Created by Anton on 24.01.2018.
 */
import React from 'react';
import { StaticRouter } from 'react-router';
import express from 'express';
import StaticRender from './static_render';
import API from './api';

global.__SERVER__ = true;

const app = express();

app.use(express.static("public"));
app.get('/api', (req, res) => API(req, res));
app.get('*', (req, res) => StaticRender(req, res));
app.listen(3000, () => console.log('Server listening on port 3000!'));