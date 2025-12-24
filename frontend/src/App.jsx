import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";
import EditUser from "./pages/EditUser";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddUser />} />
      <Route path="/users/:id" element={<ViewUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  )
}

export default App
