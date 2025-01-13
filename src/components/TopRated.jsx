import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const TopRated = () => {
    const navigate = useNavigate();
    const [allUpcomingMovies, setAllUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = React.useState(1)
    


    let Api_key = 'c45a857c193f6302f2b5061c3b85e743';
    useEffect(() => {

        setLoading(true);

        axios.request(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${count}`).then((response) => {
            console.log(response);
            setAllUpcomingMovies((allUpcomingMovies) => [...allUpcomingMovies, ...response.data.results]);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [count])

    const handledclick = (e) => {
        console.log(e);
        navigate('/movie-detail', { state: { key: e } });
    }

    const loadMoreData = () =>{
        console.log(count);
        setCount((prevCount) => prevCount + 1);
        console.log(count);
    }



    return (
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
                                allUpcomingMovies.map((name, index) => {
                                    return <div className="col" key={name.id} onClick={() => handledclick(name.id)}>
                                        <div className="movie-card my-5">
                                            <img src={`https://image.tmdb.org/t/p/w500${name?.poster_path}` ? `https://image.tmdb.org/t/p/w500${name?.poster_path}` : blankimg} alt={name.title} />
                                            <p className='text-light fs-6 fw-bold'>{name.title}</p>
                                            <p className='text-light'>{name.vote_average}</p>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                        <div className='d-flex justify-content-center m-5'>
                            <button className='btn btn-success' onClick={loadMoreData}>Load More</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default TopRated