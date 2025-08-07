import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PageVerifyEmail from './pages/PageVerifyEmail'

function App() {
  return (
    <Router>
      <Routes>
        {/*
          Esta es tu ruta principal.
          Cualquier otra ruta debe ser definida aquí arriba.
        */}
        <Route path="/" element={<PageVerifyEmail />} />

        {/*
          Esta es la ruta comodín (catch-all).
          Debe ser la última ruta en la lista.
          El path="*" coincide con cualquier URL que no haya sido
          coincidida por las rutas anteriores.
          El componente <Navigate to="/" replace /> redirige al usuario
          a la ruta raíz ("/") y reemplaza la entrada en el historial
          del navegador, para que no pueda volver a la página de error.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App