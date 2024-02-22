import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes-nav/AppRoutes";
import Appbar from "./routes-nav/Appbar";
import ScrollToHashElement from "./components/ScrollToHashElement";

import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <ScrollToHashElement/>
      <Appbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
