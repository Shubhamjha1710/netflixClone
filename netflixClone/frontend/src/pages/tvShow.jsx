import React , {useState , useEffect} from 'react'
import {styled} from 'styled-components' 
import Navbar from '../component/navbar'
import SelectGenres from '../component/selectGenres';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../component/slider';
import NotFound from '../component/notFound';
function TvShow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const [user , setUser] = useState(undefined)
    const [isScrolled , setIsScrolled] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }));
        }
    }, [genresLoaded]);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
    });
    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="data">
                <SelectGenres genres={genres} type="tv"/>
                {
                    movies.length ? (<Slider movies={movies}/> ) : (<NotFound/>)
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    .data{
        margin-top : 7rem;
    }
`;

export default TvShow