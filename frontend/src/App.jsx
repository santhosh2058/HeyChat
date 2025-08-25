import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import {  LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import RequireAuth from './components/RequireAuth'
import { ChatPage } from './pages/ChatPage'

//handle chat page route on /chat after authorization
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/chat' element={
        <RequireAuth>
          <ChatPage />
        </RequireAuth>
      }/>
    </Routes>
  )
}

export default App
