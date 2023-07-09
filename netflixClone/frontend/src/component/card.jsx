import React , {useEffect, useState} from 'react'
import {styled} from 'styled-components'
import { useNavigate } from 'react-router-dom';
import video from '../image/video.mp4';
import {IoPlayCircleSharp} from 'react-icons/io5';
import {RiThumbUpFill , RiThumbDownFill} from 'react-icons/ri';
import {BsCheck} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {BiChevronDown} from 'react-icons/bi';
import {onAuthStateChanged} from 'firebase/auth'
import {firebaseAuth} from '../utils/firebase-config'
import axios from 'axios';
// import YouTube from 'react-youtube';

function Card({movieData , key , index , isLiked=false}) {
    const navigate = useNavigate();
    // const [trailerLink , setTrailerLink] = useState('tlzO2kvAjlw');
    // const option = {
    //     width : "100%",
    //     playerVars :{
    //         autoPlay :1,
    //     },
    // };

    // useEffect(()=>{
    //     const fetchTrailer = async ()=>{
    //         try{
    //             const {data : {results}} = await axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=9ee5cf26234d534680bd20e0125f2ce8`)

    //             if(results.length > 0) setTrailerLink(results[0].key);
    //         } catch (err){
    //         }
    //     }

    //     fetchTrailer();
    // },[])

    const [email , setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        } else navigate("/login");
    });

    const addToList = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/add", {
            email,
            data: movieData,
        });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container >
            <div className="movie-card">
                <div className="cardFront">
                    <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" />
                </div>

                <div className="cardBack">
                    <video src={video} autoPlay loop muted onClick = {()=>navigate("/player")}/>
                    <div className="info-container">
                        <h3 className="name" onClick={()=>navigate("/player")}>
                            {movieData.name}
                        </h3>

                        <div className="icons">
                            <div className="controls">
                                <IoPlayCircleSharp title="Play" onClick={()=>navigate("/player")} />
                                <RiThumbUpFill title="Like"/>
                                <RiThumbDownFill title="Dislike"/>

                                {
                                    isLiked ? (
                                        <BsCheck title="Remove from List"/>
                                    ) : (
                                        <AiOutlinePlus title="Add to my List" onClick={addToList
                                        }/>
                                    )
                                }
                            </div>
                            <div className="info">
                                <BiChevronDown title="More Info" />
                            </div>
                        </div>
                        <div className="genres">
                            <ul>
                                {movieData.genres.map((genre) => {
                                    return <li key={genre}>{genre}</li>})
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        
    )
}

const Container = styled.div`
    width: 350px;
    height :280px;
    position :relative;
    display :flex;
    margin : 10px 15px 10px 15px;
    
    .movie-card{
        width: 330px;
        height :280px;
        position :relative;
        transform-style : preserve-3d;
        transition : all 0.5s ease;
        box-shadow : 0px 0px 15px rgba(255 , 0 , 0 , 0.8);
        min-width : 300px;
        &:hover{
            transform :rotateY(180deg);
        }
        
        .cardFront{
            position : absolute;
            width: 330px;
            height :280px;
            backdrop-filter : blur(2.5rem);
            backface-visibility :hidden;
            border-radius : 5px;
            min-width : 300px;
            
            img{
                border-radius : 5px;
                width: 330px;
                height :280px;
                z-index : 10;
                min-width : 300px;
            }
        }
        
        .cardBack{
            position : absolute;
            width: 330px;
            height :280px;
            backdrop-filter : blur(2.5rem);
            backface-visibility :hidden;
            transform :rotateY(180deg);
            min-width : 300px;
            
            video{
                cursor: pointer;
                width: 100%;
            }

            .info-container{
                h3{
                    cursor :pointer;
                }
                
                display :flex;
                flex-direction : column;
                padding :5px;
                gap :5px;
                color :white;

                .icons{
                    display :flex;
                    .controls{
                        display :flex;
                        gap : 15px;
                    }
                    svg{
                        font-size: 20px;
                        cursor: pointer;
                        transition: 0.3s ease-in-out;
                        &:hover {
                            color: #e50914;
                        }
                    }
                }

                .genres{
                    display :flex;
                    ul{
                        display :flex;
                        gap : 15px;
                        li{
                            list-style: none;
                        }
                    }
                }
            }
        }
    }
    

    }
`;
export default Card