import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SellersList from "./components/sellers-list.component";
import SellersAdd from "./components/sellers-add.component";
import SalesList from "./components/sales-list.component";
import SalesAdd from "./components/sales-add.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="#" className="navbar-brand">Seller Project</a>

            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/sellers" className="nav-link">
                  Vendedores
                </Link>
              </li>
              {/* <li>
                <Link to="/sales" className="nav-link">
                  Vendas
                </Link>
              </li> */}
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/sellers" component={SellersList} />
              <Route exact path="/sellers/add" component={SellersAdd} />
              <Route exact path="/sales/:id" component={SalesList} />
              <Route exact path="/sales/:id/add" component={SalesAdd} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
