import "./App.css";

import MainScreen from "./screens/mainScreen";
import PageNotFound from "./screens/404";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import DetailScreen from "./screens/DetailScreen";
import BookingScreen from "./screens/BookingScreen";

function App() {
  return (
    <div className="App">
    

      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route exact path="/main" element={<MainScreen />}></Route>       
        <Route exact path="/details/:id" element={<DetailScreen/>}></Route>
        <Route exact path="/bookings/:id" element={<BookingScreen/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
