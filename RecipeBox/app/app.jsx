// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// CSS for Dev Environment
require('../public/styles/scss/master.scss');

//Import Whole Application
import Application from "./index.jsx";

//Variable for DOM
const APP = document.getElementById("APP");


// Render Application Into DOM
ReactDOM.render(<Application/>, document.getElementById("APP"))
