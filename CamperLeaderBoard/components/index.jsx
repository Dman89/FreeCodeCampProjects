import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';

import Application from './Application.jsx';

const APP = document.getElementById('APP');

ReactDOM.render(<Application/>, APP);
