import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListPlace from "./component/ListPlace";
import Nav from "./component/Nav";
import Contact from "./component/Contact";
import TablePlace from "./component/TablePlace";
import Login from "./component/login";
import Dashborad from "./component/Dashbord";
function App() {
  const serverName = "http://localhost/apiPlace/";
  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<ListPlace serverName={serverName} />} /> */}
          {/* <Route path="place/create"element={<CreatePlace serverName={serverName} />}/> */}
          <Route
            exact
            path="/"
            element={<ListPlace serverName={serverName} />}
          />
          <Route
            path="/contact"
            element={<Contact serverName={serverName} />}
          />
          <Route
            path="/tableplace"
            element={<TablePlace serverName={serverName} />}
          />
          <Route path="/login" element={<Login serverName={serverName} />} />
          <Route
            path="/dashbord"
            element={<Dashborad serverName={serverName} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
