import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';

import Nav from './Nav/Nav.jsx';

const APP = document.getElementById('APP');

ReactDOM.render(<Nav/>, APP);
