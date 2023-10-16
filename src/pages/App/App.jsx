import { Routes, Route } from "react-router-dom";
import ShowContacts from "../ShowContacts/ShowContacts"
import AddContact from "../AddContact/AddContact";
import EditContact from "../EditContact/EditContact";

const App = () => {
  return (
    <main className="App">

    <Routes>
        <Route path="/" element={<ShowContacts/>} />
        <Route path="/contacts/add" element={<AddContact/>} />
        <Route path="/contacts/:id" element={<EditContact/>} />
    </Routes>
    </main>
  )
}

export default App
