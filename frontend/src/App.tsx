import "./styles/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { About } from "./pages/About";
import { AllRecipes } from "./pages/AllRecipes";
import { Recipe } from "./pages/Recipe";

function App() {

  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/AllRecipes" element={<AllRecipes/>}/>
        <Route path="/Recipe" element={<Recipe/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
