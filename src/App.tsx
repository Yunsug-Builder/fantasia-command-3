import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from './pages/Lobby';
import Battle from './pages/Battle';
import Grimoire from './pages/Grimoire';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/grimoire" element={<Grimoire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
