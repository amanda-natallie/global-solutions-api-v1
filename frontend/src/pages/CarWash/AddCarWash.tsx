import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ICarWashProps } from "../../types";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import { Grid, Button, TextField } from "@material-ui/core";
import api from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    mgTop: {
        marginBlock: 30
    },
  })
);

const AddCarWash = () => {
  const classes = useStyles();
  const history = useHistory();
  const [carWash, setCarWash] = useState<ICarWashProps>({
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    photos: undefined,
  });

  const handleSave = async () => {
    try {
        await api.post("/carwash/create", carWash).then(() => {
            history.push("/carwash");
        });
      } catch (error) {
        console.log("Ocorreu um erro", error);
      }
  }

const isEmpty = !carWash.name || !carWash.email || !carWash.phone || !carWash.address || !carWash.photos;

  return (
    <LayoutContainer>
      <PageHeader
        title="Adicionar Novo Estabelecimento"
        button="Voltar"
        action={() => history.push("/carwash")}
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Nome do Estabelecimento"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCarWash({ ...carWash, name: e.target.value })}
            variant="outlined"
            fullWidth
            type="url"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="E-mail do Estabelecimento"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCarWash({ ...carWash, email: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Endereço do Estabelecimento"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCarWash({ ...carWash, address: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Telefone do Estabelecimento"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCarWash({ ...carWash, phone: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Foto de Capa do Estabelecimento (URL apenas)"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCarWash({ ...carWash, photos: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" className={classes.mgTop}>
        <Button 
        variant="outlined" 
        color="primary" disabled={isEmpty} onClick={() => handleSave()}>
          Salvar Novo Estabelecimento
        </Button>
      </Grid>
    </LayoutContainer>
  );
};

export default AddCarWash;
