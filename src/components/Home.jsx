import '../styles/Home.css';
import axios from 'axios'; // For API Calls
import React, { useEffect, useState } from 'react';
import blankimg from '../assets/blankMovi.webp';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);  // Use `page` instead of `count`

    const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
    
    useEffect(() => {
        setLoading(true);
        
        // Fetch movies for the current page
        axios
            .request(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`)
            .then((response) => {
                console.log(response);
                setAllMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]); // Trigger effect when `page` changes

    const handleClick = (movieId) => {
        navigate('/movie-detail', { state: { key: movieId } });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= 20) {
            setPage(newPage);  // Update to the selected page
        }
    };

    return (
        <div>
            <div>
                {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="container text-center">
                        <div className="row row-cols-5">
                            {allMovies.map((movie) => (
                                <div className="col" key={movie.id} onClick={() => handleClick(movie.id)}>
                                    <div className="movie-card my-5">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || blankimg}
                                            alt={movie.title}
                                        />
                                        <p className="text-light fs-6 fw-bold">{movie.title}</p>
                                        <p className="text-light">{movie.vote_average}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center m-5">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(5)].map((_, index) => {
                                        const pageNumber = index + 1 + (page - 1); // Dynamically generate pages around the current page
                                        return (
                                            <li key={pageNumber} className="page-item">
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        );
                                    })}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
