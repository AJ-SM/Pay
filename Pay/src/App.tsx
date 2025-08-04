
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signup } from '../Pages/Signup'
import { Dashboard } from '../Pages/Dashboard'
import { Login } from '../Pages/Login'
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>


      </Routes>
      
      </BrowserRouter>
    
    </>
  )
}

export default App
