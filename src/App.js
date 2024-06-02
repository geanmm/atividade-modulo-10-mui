import Header from "./components/header";
import ListarServidor from "./pages/tarefa/ListarServidor";

function App() {
  return (
    <div className="App" style={{ height: "100vh", background: "#f4f4f4" }}>
      <Header />
      <ListarServidor />
    </div>
  );
}

export default App;
