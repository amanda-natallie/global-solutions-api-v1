import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Car from "./pages/Car";
import AddCar from "./pages/Car/AddCar";
import UpdateCar from "./pages/Car/UpdateCar";
import CarWash from "./pages/CarWash";
import AddCarWash from "./pages/CarWash/AddCarWash";
import UpdateCarWash from "./pages/CarWash/UpdateCarWash";
import Home from "./pages/Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    }, 
    secondary: {
      main: "#9874BE",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* CARROS CRUD */}
          <Route path="/car" exact>
            <Car />
          </Route>
          <Route path="/add-car" exact>
            <AddCar />
          </Route>
          <Route path="/update-car/:id" exact>
            <UpdateCar />
          </Route> 

          {/* LAVA RAPIDO CRUD */}
          <Route path="/carwash" exact>
            <CarWash />
          </Route>
          <Route path="/add-carwash" exact >
            <AddCarWash />
          </Route>
          <Route path="/update-carwash/:id" exact > 
            <UpdateCarWash />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
