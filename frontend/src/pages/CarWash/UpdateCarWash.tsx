import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { ICarWashProps } from "../../types";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import { Grid, Button, TextField } from "@material-ui/core";
import api from "../../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mgTop: {
      marginBlock: 30,
    },
  })
);

const UpdateCarWash = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [carWash, setCarWash] = useState<ICarWashProps>();

  useEffect(() => {
    try {
      api.post("/carwash/getById", { id }).then((data: any) => {
        setCarWash(data.data.records[0]);
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.post("/carwash/update", carWash).then(() => {
        history.push("/carwash");
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  };

  const isEmpty =
    !carWash?.name ||
    !carWash?.email ||
    !carWash?.phone ||
    !carWash?.address ||
    !carWash?.photos;

  return (
    <LayoutContainer>
      <PageHeader
        title="Editar Carro"
        button="Voltar"
        action={() => history.push("/carwash")}
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={carWash?.name}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={carWash?.email}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={carWash?.address}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={carWash?.phone}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={carWash?.photos}
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
          color="primary"
          disabled={isEmpty}
          onClick={() => handleSave()}
        >
          Atualizar Carro
        </Button>
      </Grid>
    </LayoutContainer>
  );
};

export default UpdateCarWash;
