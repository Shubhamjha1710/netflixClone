import React, { useEffect, useState }  from 'react'
import Navbar from '../component/navbar'
import Slider from '../component/slider';
import backgroundImage from '../image/home.jpg';
import MovieLogo from '../image/homeTitle.webp';
import {FaPlay} from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import { fetchMovies, getGenres } from '../store/index.js';

function Netflix() {
    const navigate = useNavigate();
    const [isScrolled , setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    useEffect(()=>{
        if(genresLoaded){
            dispatch(fetchMovies({
                genres,
                type :'all',
            }))
        }
    } , [genresLoaded])

    window.onscroll = ()=>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return ()=>{window.onscroll = null}
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="hero">
                <img src={backgroundImage} alt="bgImage" />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="buttons">
                        <button onClick={()=>navigate('/player')}>
                            <FaPlay/> 
                            Play
                        </button>
                        <button>
                            <AiOutlineInfoCircle/>
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies}/>
        </Container>
    )
}

const Container = styled.div`
background-color :black;
    .hero{
        position :relative;
        img{
            filter :brightness(60%);
            height :100vh;
            width :100%;
        }
        
        @media(max-width :350px){
            width : 390px;
        }
        .container{
            position :absolute;
            bottom : 4rem;
            width :100%;
            .logo{
                img{
                    width :60%;
                    height :100%;
                    margin :1rem 3rem 1rem 3rem;
                    filter :brightness(100%);

                    @media(max-width :700px){
                        width:80%;
                    }
                }
            }

            .buttons{
                display :flex;
                margin :2rem 3rem 2rem 3rem;
                gap :2rem;

                button{
                    display :flex;
                    align-items: center;
                    justify-content : center;
                    font-size: 1.4rem;
                    gap :1rem;
                    border-radius :0.2rem;
                    padding: 0.5rem 2rem 0.5rem 2.4rem;
                    border :none;
                    cursor: pointer;
                    transition :0.2s ease-in-out;
                    
                    @media(max-width : 700px){
                        padding: 0.5rem 1rem 0.5rem 1.2rem;
                        font-size: 1rem;
                    }
                    @media(max-width : 370px){
                        padding: 0.2rem 1rem 0.2rem 1.2rem;
                    }
                    &:hover{
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.7);
                        color: white;
                        svg {
                            font-size: 1.4rem;
                        }
                    }
                }
            }
        }
    }
`;
export default Netflix