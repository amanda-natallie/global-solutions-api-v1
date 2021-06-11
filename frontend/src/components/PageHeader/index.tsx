import React from "react"; 
import { Grid, Typography, Button, Divider } from "@material-ui/core";

interface Iprops {
  title: string;
  button: string;
  action: () => void;
}

const PageHeader = ({ title, button, action }: Iprops) => {
  return (
      <React.Fragment>
          <Grid container alignItems="center" justify="space-between">
            <Typography variant="h5">{title} </Typography>
            <Button variant="contained" color="secondary" onClick={action}>
              {button}
            </Button>
          </Grid>
          <Divider style={{ marginBlock: 30 }} />
      </React.Fragment>
  );
};

export default PageHeader;
