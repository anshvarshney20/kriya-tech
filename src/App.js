import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './Components/Index'
import Contact from './Components/Contact'
import Pricing from './Components/Pricing'
import Features from './Components/Features'
import Creators from './Components/Creators'
import Admin from './Components/Admin'
import CreatorsDetail from './Components/CreatorsDetail'
import { UserAuthContextProvider } from './Components/AuthContext'
import Dashboard from './Components/Dashboard'
import CreateUser from './Components/CreateUser'
import UpdateUser from './Components/UpdateUser'

function App() {
  return (
    <>
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='' element={<Index />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/features' element={<Features />} />
            <Route path='/creators' element={<Creators />} />
            <Route path='/:username' element={<CreatorsDetail />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/createuser' element={<CreateUser/>} />
            <Route path='/update/:username' element={<UpdateUser/>} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </>
  )
}

export default App