import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import blankimg from '../assets/blankMovi.webp'


const MovieDetail = () => {
  const location = useLocation();
  console.log(location.state);

  const [movieDetail, setMoviesDetail] = React.useState();
  const [cast, setCast] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  let Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  useEffect(() => {

    setLoading(true);

    axios.request(`https://api.themoviedb.org/3/movie/${location.state.key}?api_key=${Api_key}&language=en-US`).then((response) => {
      console.log(response);
      setMoviesDetail(response.data);
    })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    axios.request(`https://api.themoviedb.org/3/movie/${location.state.key}/credits?api_key=${Api_key}&language=en-US`).then((response) => {
      console.log(response);
      setCast(response.data.cast);
      console.log(response.data.cast);
    })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])
  return (
    <div className='p-2 text-light'>
      <div className='d-flex justify-content-center'>
        <div className='d-flex border border-3 border-secondary setDetailes mt-3 rounded-3 p-2 shadow-lg'>
          <div className='w-50'>
            <div className='d-flex'>
              <div>
                <img src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` ? `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` : blankimg} alt={'any'} width={100} height={170} />
              </div>
              <div className='ms-2'>
                <h2>{movieDetail?.title}</h2>
                <p>Rating: {movieDetail?.vote_average}</p>
                <p><span className='border border-1 shadow p-1'>{movieDetail?.runtime} min</span><span>  Drama</span></p>
                <p>Release Date : {movieDetail?.release_date}</p>
              </div>
            </div>
            <div>
              <h3 className='my-3'>Overview</h3>
              <p>{movieDetail?.overview}</p>
            </div>
          </div>

          <div className='w-50'>
            <img className='secdiv' src={`https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}` ? `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}` : blankimg} alt={'any'} />
          </div>
        </div>
      </div>

      <div>
          <h1 className='mt-2'>Cast</h1>
        <div className='row row-cold-flex gap-4'>
          {
            cast.map((person) => {
              return <div className="col my-3 p-3" key={person.id}>
                <img src={`https://image.tmdb.org/t/p/w500${person?.profile_path}` ? `https://image.tmdb.org/t/p/w500${person?.profile_path}` : blankimg} alt={''} className='rounded-3 shadow-lg' width={200} height={300} />
                <p className='text-light fs-6 fw-bold mt-2 mb-0'>{person?.name}</p>
                <p className='text-light'>{person?.character}</p>
              </div>
            })
          }

        </div>
      </div>

    </div>
  )
}

export default MovieDetail