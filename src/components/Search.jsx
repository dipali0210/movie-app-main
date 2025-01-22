import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NoSearch from './../assets/noFound.webp';
import blankimg from '../assets/blankMovi.webp';
import axios from 'axios';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(false);

    const Api_key = 'c45a857c193f6302f2b5061c3b85e743';

    useEffect(() => {
        if (location.state && location.state.key) {
            setLoading(true);
            axios
                .request(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${location.state.key}`)
                .then((response) => {
                    console.log("Search results:", response.data.results);
                    setSearch(response.data.results);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location.state?.key]);

    const handledclick = (e) => {
        console.log(e);
        navigate('/movie-detail', { state: { key: e } });
    };

    return (
        <>
            {search.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center vh-100 text-center'>
                    <img src={NoSearch} alt="No results found" />
                </div>
            ) : (
                <div>
                    <div>
                        {loading ? (
                            <div className="loader-container">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="container text-center">
                                <div className="row row-cols-4">
                                    {search.map((name) => (
                                        <div className="col" key={name.id} onClick={() => handledclick(name.id)}>
                                            <div className="movie-card my-5">
                                                <img
                                                    src={name?.poster_path ? `https://image.tmdb.org/t/p/w500${name.poster_path}` : blankimg}
                                                    alt={name?.title}
                                                />
                                                <p className='text-light fs-6 fw-bold'>{name?.title}</p>
                                                <p className='text-light'>{name?.vote_average}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;