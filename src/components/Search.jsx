import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NoSearch from './../assets/noFound.webp';


const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (location.state?.key) {
            setLoading(true);
            console.log("New key from location.state:", location.state.key);
            setSearch(location.state.key);
            setLoading(false);
        }
    }, [location.state.key, search])

    const handledclick = (e) => {
        console.log(e);
        navigate('/movie-detail', { state: { key: e } });
    }


    return (
        <>{
            search.length == 0 ?
                <div className='d-flex justify-content-center align-items-center vh-100 text-center'>
                    <img src={NoSearch} alt="" />
                </div>

                :

                <div>

                    <div>
                        {loading ? (
                            <div className="loader-container">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="container text-center">
                                <div className="row row-cols-4">
                                    {
                                        search.map((name, index) => {
                                            return <div className="col" key={name.id} onClick={() => handledclick(name.id)}>
                                                <div className="movie-card my-5">
                                                    <img src={`https://image.tmdb.org/t/p/w500${name?.poster_path}` ? `https://image.tmdb.org/t/p/w500${name?.poster_path}` : blankimg} alt={name?.title} />
                                                    <p className='text-light fs-6 fw-bold'>{name?.title}</p>
                                                    <p className='text-light'>{name?.vote_average}</p>
                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                        )}
                    </div>

                </div>
        }
        </>
    )
}

export default Search