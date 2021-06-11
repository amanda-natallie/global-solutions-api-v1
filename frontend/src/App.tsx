import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Car from "./pages/Car";
import AddCar from "./pages/Car/AddCar";
import UpdateCar from "./pages/Car/UpdateCar";
import CarWash from "./pages/CarWash";
import AddCarWash from "./pages/CarWash/AddCarWash";
import UpdateCarWash from "./pages/CarWash/UpdateCarWash";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* CARROS CRUD */}
        <Route path="/car">
          <Car />
        </Route>
        <Route path="/add-car">
          <AddCar />
        </Route>
        <Route path="/update-car/:id">
          <UpdateCar />
        </Route>


        {/* LAVA RAPIDO CRUD */}
        <Route path="/carwash">
          <CarWash />
        </Route>
        <Route path="/add-carwash">
          <AddCarWash />
        </Route>
        <Route path="/update-carwash/:id">
          <UpdateCarWash />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
