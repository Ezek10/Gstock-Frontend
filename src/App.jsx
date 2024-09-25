import Home from "./Views/Home/Home"
import Login from "./Views/Login/Login"
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'typeface-mukta';

function App() {

  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
