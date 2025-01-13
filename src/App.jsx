import "./App.css";
import Home from "./components/Home";
import TopRated from "./components/TopRated";
import UpcomingMovies from "./components/UpcomingMovies";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";
import Search from "./components/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
