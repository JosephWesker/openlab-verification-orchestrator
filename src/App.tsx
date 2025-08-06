import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import PageVerifyEmail from './pages/PageVerifyEmail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageVerifyEmail />} />
      </Routes>
    </Router>
  )
}

export default App
