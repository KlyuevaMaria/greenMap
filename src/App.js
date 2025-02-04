import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
