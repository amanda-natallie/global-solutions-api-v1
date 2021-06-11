import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      margin: 0
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const LayoutContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => history.push("/")}>
            Garage Car Companion - Consuming API
          </Typography>
          <Button color="inherit" onClick={() => history.push("/car")}>
            Carros
          </Button>
          <Button color="inherit" onClick={() => history.push("/carwash")}>
            Lava Rápidos
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
          <Grid item xs={12} style={{ padding: 50 }}>
              {children}
          </Grid>
      </Grid>
    </div>
  );
};

export default LayoutContainer;
