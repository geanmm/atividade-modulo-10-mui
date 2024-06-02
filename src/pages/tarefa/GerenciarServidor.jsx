import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const GerenciarServidor = ({
  handleCloseModal,
  servidor,
  servidores,
  setServidores,
  action,
}) => {
  const [servidorAtual, setServidorAtual] = useState(null);
  const [cpfFormat, setCpfFormat] = useState("");

  useEffect(() => {
    if (servidor) setServidorAtual(servidor);
    else setServidorAtual({});
    setCpfFormat(cpfChange(servidor.cpfServidor));
  }, [servidor]);

  const handleSaveChanges = () => {
    if (action === "editar") {
      setServidores((current) =>
        current.map((servidor) => {
          if (servidor.registroServidor === servidorAtual.registroServidor) {
            return servidorAtual;
          }
          return servidor;
        })
      );
    } else {
      let regExists =
        servidores.findIndex((s) => {
          return s.registroServidor === servidorAtual.registroServidor;
        }) !== -1;

      if (regExists) return alert("Já existe um servidor com esse registro");

      if (
        servidorAtual.situacaoServidor === "Desligado" &&
        !servidorAtual.desligamentoServidor
      )
        return alert(
          "Data de desligamento tem o preenchimento obrigatório para a situação atual"
        );
      if (servidorAtual.cpfServidor.length < 14) return alert("CPF Inválido");
      if (
        !servidorAtual.registroServidor ||
        !servidorAtual.admissaoServidor ||
        !servidorAtual.cpfServidor ||
        !servidorAtual.nomeServidor ||
        !servidorAtual.cargoServidor ||
        !servidorAtual.situacaoServidor
      ) {
        return alert("Há campos de preenchimento obrigatório em branco");
      }

      setServidores([...servidores, servidorAtual]);
    }
    handleCloseModal();
  };

  function cpfChange(cpfValue) {
    const numeric = cpfValue.replace(/[^0-9]+/g, "");
    const cpfLength = numeric.length;

    const partOne = numeric.slice(0, 3) + ".";
    const partTwo = numeric.slice(3, 6) + ".";
    const partThree = numeric.slice(6, 9) + "-";

    let current = "";

    if (cpfLength < 4) {
      current = numeric;
    } else if (cpfLength >= 4 && cpfLength < 7) {
      current = partOne + numeric.slice(3);
    } else if (cpfLength >= 7 && cpfLength < 10) {
      current = partOne + partTwo + numeric.slice(6);
    } else if (cpfLength >= 10 && cpfLength < 12) {
      current = partOne + partTwo + partThree + numeric.slice(9);
    } else if (cpfLength >= 12) {
      current = partOne + partTwo + partThree + numeric.slice(9, 11);
    }
    return current;
  }

  return (
    servidorAtual && (
      <Grid container spacing={2}>
        <Card sx={style}>
          <CardHeader title="Servidores" subheader="Edição de Servidores" />
          <CardContent
            sx={{
              width: "95%",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={true}>
                <FormControl fullWidth>
                  <TextField
                    id="servidor_registro"
                    type="number"
                    label="Registro"
                    value={servidorAtual.registroServidor}
                    required
                    onChange={(e) =>
                      setServidorAtual((prev) => ({
                        ...prev,
                        registroServidor: parseInt(e.target.value),
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={"auto"}>
                <FormControl>
                  <TextField
                    id="servidor_admissao"
                    type="date"
                    label="Data admissão"
                    required
                    InputLabelProps={{ shrink: true }}
                    value={
                      servidorAtual.admissaoServidor
                        ? servidorAtual.admissaoServidor
                        : " "
                    }
                    onChange={(e) => {
                      setServidorAtual((prev) => ({
                        ...prev,
                        admissaoServidor: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={"auto"}>
                <FormControl>
                  <TextField
                    id="servidor_desligamento"
                    type="date"
                    label="Data desligamento"
                    value={
                      servidorAtual.desligamentoServidor
                        ? servidorAtual.desligamentoServidor
                        : " "
                    }
                    disabled={
                      servidorAtual.situacaoServidor !== "Desligado"
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      setServidorAtual((prev) => ({
                        ...prev,
                        desligamentoServidor: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="servidor_cpf"
                  label="CPF"
                  inputProps={{ maxLength: 14 }}
                  value={cpfFormat}
                  required
                  onInput={(e) => setCpfFormat(cpfChange(e.target.value))}
                  onChange={(e) =>
                    setServidorAtual((prev) => ({
                      ...prev,
                      cpfServidor: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="servidor_nome"
                  label="Nome"
                  required
                  value={servidorAtual.nomeServidor}
                  onChange={(e) =>
                    setServidorAtual((prev) => ({
                      ...prev,
                      nomeServidor: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="servidor_cargo"
                  label="Cargo"
                  required
                  value={servidorAtual.cargoServidor}
                  onChange={(e) =>
                    setServidorAtual((prev) => ({
                      ...prev,
                      cargoServidor: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="servidor_situacao">Situação</InputLabel>
                <Select
                  id="servidor_situacao"
                  value={servidorAtual.situacaoServidor}
                  label="Situação"
                  onChange={(e) => {
                    setServidorAtual((prev) => ({
                      ...prev,
                      situacaoServidor: e.target.value,
                    }));
                  }}
                  size="small"
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                    height: "55px",
                  }}
                >
                  <MenuItem value={"Ativo"}>Ativo</MenuItem>
                  <MenuItem value={"Desligado"}>Desligado</MenuItem>
                  <MenuItem value={"Cedido"}>Cedido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} mt={0.2}>
              <Grid container spacing={2} pl={2} mt={2}>
                <Grid item xs={"auto"}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleSaveChanges}
                  >
                    {action === "editar" ? "Alterar" : "Adicionar"}
                  </Button>
                </Grid>
                <Grid item xs={"auto"}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  p: 4,
};

export default GerenciarServidor;
