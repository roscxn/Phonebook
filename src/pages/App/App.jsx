import { Routes, Route } from "react-router-dom";
import ShowContacts from "../ShowContacts/ShowContacts"
import AddContact from "../AddContact/AddContact";

const App = () => {
  return (
    <main className="App">

    <Routes>
        <Route path="/" element={<ShowContacts/>} />
        <Route path="/add" element={<AddContact/>} />
    </Routes>
    </main>
  )
}

export default App
