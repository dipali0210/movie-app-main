import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [search, setSearch] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [searchedMovie, setSearchedMovie] = React.useState([])
    const navigate = useNavigate();


    const handledSearch = (e) => {
        e.preventDefault();

        console.log(search);

        let Api_key = 'c45a857c193f6302f2b5061c3b85e743';

        setLoading(true);

        axios.request(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${search}&page=11`).then((response) => {
            console.log(response);
            setSearchedMovie(response.data.results);
            navigate('/search', { state: { key: searchedMovie } });
            setSearch('')
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid nav-dis">
                    <a className="navbar-brand" href="/">MovieDb</a>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mb-2 mb-lg-0 nav-head">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/popular">Popular</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/top-rated">Top Rated</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/upcoming">Upcoming</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} name='search' value={search} />
                            <button
                                className="btn btn-outline-success" onClick={handledSearch} >Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar