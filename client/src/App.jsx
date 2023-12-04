import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar"
import AppRoutes from "./components/AppRoutes"

function App() {
  return (
    <Router>
        <div className="app">
            <h1>React ile Rails Blog</h1>
            <p>Bu uygulama düzenini client/src/App.jsx</p>
            <NavBar />
            <AppRoutes />
        </div>
    </Router>
  )
}

export default App
