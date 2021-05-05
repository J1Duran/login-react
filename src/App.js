import React  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Login} from "./components/auth/login";
import { Dashboard } from './components/dashboard/dashboard';


function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
