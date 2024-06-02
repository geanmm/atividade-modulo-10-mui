import {
  Card,
  CardContent,
  CardHeader,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CardActions,
  Modal,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import GerenciarServidor from "./GerenciarServidor";

function createData(
  registroServidor,
  admissaoServidor,
  desligamentoServidor,
  nomeServidor,
  cpfServidor,
  cargoServidor,
  situacaoServidor
) {
  return {
    registroServidor,
    admissaoServidor,
    desligamentoServidor,
    nomeServidor,
    cpfServidor,
    cargoServidor,
    situacaoServidor,
  };
}
const initialRows = [
  createData(
    465,
    "2022-01-01",
    "",
    "Aghata Soares Pereira",
    "123.245.121-33",
    "Professor",
    "Ativo"
  ),
  createData(
    162,
    "2022-01-01",
    "2022-03-04",
    "José de Souza Silva",
    "113.222.333-44",
    "Gari",
    "Desligado"
  ),
  createData(
    9987,
    "2022-01-01",
    "",
    "Joana D'arc de Melo",
    "174.848.999-11",
    "A.Admin",
    "Ativo"
  ),
  createData(
    256,
    "2012-01-01",
    "",
    "Jéssica Alves de Moura",
    "152.321.456-15",
    "Merendeira",
    "Ativo"
  ),
  createData(
    2561,
    "2014-09-01",
    "",
    "Fábio de Assunção Farias",
    "154.484.595-74",
    "Professor",
    "Cedido"
  ),
  createData(
    953,
    "2022-01-01",
    "",
    "Lucas Galvão Santana",
    "235.486.465-11",
    "Professor",
    "Cedido"
  ),
  createData(
    666,
    "1985-01-01",
    "2001-02-03",
    "Menina Etrom Saymonista",
    "999.486.666-11",
    "A.S.G",
    "Desligado"
  ),
];

const ListarServidor = () => {
  const [openModal, setOpenModal] = useState(false);
  const [servidores, setServidores] = useState([]);
  const [servidor, setServidor] = useState();
  const [action, setAction] = useState();

  useEffect(() => {
    setServidores(initialRows);
  }, []);

  const handleCloseModal = () => {
    // setServidor(servidorDummy);
    setOpenModal(false);
  };

  const handleAdicionar = () => {
    setAction("adicionar");
    setServidor(servidorDummy);
    setOpenModal(true);
  };
  const handleEditar = (registro) => {
    let servidorParaEditar = servidores.filter((servidor) => {
      return servidor.registroServidor === registro;
    })[0];

    setAction("editar");
    setServidor(servidorParaEditar);
    setOpenModal(true);
  };

  const handleDeletar = (registro) => {
    setServidores((current) =>
      current.filter((s) => {
        return s.registroServidor !== registro;
      })
    );
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#f4f4f4", padding: 2 }}>
        <CardHeader title="Servidores" subheader="Listagem de Servidores" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8f9fd" }}>
                  <TableCell align="center">Registro</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">CPF</TableCell>
                  <TableCell align="left">Cargo</TableCell>
                  <TableCell align="center">Situação</TableCell>
                  <TableCell align="center">Admissão</TableCell>
                  <TableCell align="center">Desligamento</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servidores.map((row, index) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { background: "#f5fcfc" },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.registroServidor}
                    </TableCell>
                    <TableCell align="left">{row.nomeServidor}</TableCell>
                    <TableCell align="left">{row.cpfServidor}</TableCell>
                    <TableCell align="left">{row.cargoServidor}</TableCell>
                    <TableCell align="center">
                      <div style={situacaoStyle[row.situacaoServidor]}>
                        {row.situacaoServidor}
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.admissaoServidor}</TableCell>
                    <TableCell align="center">
                      {row.desligamentoServidor}
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: 8 }}>
                      <IconButton
                        variant="contained"
                        color="success"
                        onClick={() => handleEditar(row.registroServidor)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: 8 }}>
                      <IconButton
                        variant="contained"
                        onClick={() => handleDeletar(row.registroServidor)}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: "#39a0a7",
              "&:hover": { backgroundColor: "#2d7d84" },
            }}
            onClick={handleAdicionar}
          >
            Adicionar Servidor
          </Button>
        </CardActions>
      </Card>
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <GerenciarServidor
              handleCloseModal={handleCloseModal}
              servidor={servidor}
              servidores={servidores}
              setServidores={setServidores}
              action={action}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

const situacaoStyle = {
  Cedido: {
    backgroundColor: "#e5e9ff",
    color: "#6263de",
    borderRadius: "12px",
    padding: "2px",
  },
  Ativo: {
    backgroundColor: "#defced",
    color: "#2e7353",
    borderRadius: "12px",
    padding: "2px",
  },
  Desligado: {
    backgroundColor: "#e2e3e7",
    color: "#5f6472",
    borderRadius: "12px",
    padding: "2px",
  },
};

const servidorDummy = {
  registroServidor: "",
  admissaoServidor: "",
  desligamentoServidor: "",
  nomeServidor: "",
  cpfServidor: "",
  cargoServidor: "",
  situacaoServidor: "",
};
export default ListarServidor;
