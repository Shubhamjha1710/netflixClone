import React , {useState , useEffect} from 'react'
import axios from 'axios';
import {styled} from 'styled-components' 
import Navbar from '../component/navbar'
import Card from '../component/card'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import {useDispatch , useSelector} from 'react-redux';
import { getUserLikedMovies} from '../store/index';

function Movies() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);
    const [isScrolled , setIsScrolled] = useState(false);
    const [email , setEmail] = useState(undefined);

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [email]);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });
    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="content">
                <h1>My Liked List</h1>
                <div className='data'>
                    {
                        movies.map((movie , index)=>{
                            return (
                                <Card movieData = {movie} index = {index} key = {movie.id} isLiked = {true} />
                            );
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    .content{
        margin : 2rem;
        margin-top : 8rem;
        min-width : 350px;
        padding : 10px;
        h1{
            color : white;
            margin : 0px 40px 0px 40px;
            text-align : center;
        }

        .data{
            display :flex;
            align-tems: center;
            justify-content : center;
            flex-wrap : wrap;
            mardin :5px;
        }
    }
`;

export default Movies