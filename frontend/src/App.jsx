
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Events from "./pages/Events";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import MyRegistrations from "./pages/MyRegistrations";
import Login from "./pages/login";

function App(){
  return(
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<Events />} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<EventDetail />} />
        <Route
          path="/my-registrations"
          element={<MyRegistrations/>}
        />
   </Routes>
   </BrowserRouter>
)
}
export default App;

