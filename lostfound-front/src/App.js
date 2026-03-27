//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";

import LostItemRegistration from "./Components/ItemComponent/LostItemRegistration";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemRegistration from "./Components/ItemComponent/FoundItemRegistration";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import MatchItemSearch from "./Components/ItemComponent/MatchItemSearch";
import MatchItemReport from "./Components/ItemComponent/MatchItemReport";
import ChatMessage from "./Components/ChatComponent/ChatMessage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/student-menu" element={<StudentMenu />} />

          <Route path="/lost-entry" element={<LostItemRegistration />} />
          <Route path="/lost-list" element={<LostItemReport />} />
          <Route path="/found-entry" element={<FoundItemRegistration />} />
          <Route path="/found-list" element={<FoundItemReport />} />
          <Route path="/search/:lostItemId" element={<MatchItemSearch />} />
          <Route path="/match-list" element={<MatchItemReport />} />
          <Route path="/chat" element={<ChatMessage />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
