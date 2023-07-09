import React , {useState} from 'react'
import styled from 'styled-components'
import {useNavigate , Link} from 'react-router-dom';
import Logo from '../image/logo.png';
import { signOut , onAuthStateChanged} from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import {FaPowerOff, FaSearch} from 'react-icons/fa'
function Navbar({isScrolled}) {
    const links = [
        {
            name : 'Home',
            link: '/',
        },
        {
            name : 'TV Shows',
            link: '/tv',
        },
        {
            name : 'Movies',
            link: '/movies',
        },
        {
            name : 'My List',
            link: '/mylist',
        },
    ]

    const [showSearch , setShowSearch] = useState(false);
    const [inputHover , setInputHover] = useState(false);

    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth , (currentUser)=>{
        if(!currentUser) navigate("/login")
    })
    return (
        <Container>
            <nav className={`${isScrolled ? 'scrolled' : ''}`}>
                <div className="left">
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <ul className="links">
                        {
                            links.map(({name , link})=>{
                                return(
                                    <li key={name}>
                                        <Link to={link}>{name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>  

                <div className="right">
                    <div className={`search ${showSearch ? 'show-search' : ''}`}>
                        <button
                            onFocus = {()=>setShowSearch(true)} 
                            onBlur = {()=>{
                                if(!inputHover){
                                    setShowSearch(false);
                                }
                            }}
                        >
                            <FaSearch />
                        </button>
                        <input 
                            type="text" 
                            placeholder='Search'
                            onMouseEnter ={()=>setInputHover(true)}
                            onMouseLeave ={()=>{setInputHover(false)}}
                            onBlur={()=>{
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                        />
                    </div>
                    <button onClick={()=>signOut(firebaseAuth)}>
                            <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    .scrolled{
        background-color :black;
    }

    nav{
        top :0;
        position :fixed;
        display :flex;
        align-items: center;
        justify-content: space-between;
        height :6.5rem;
        width: 100%;
        z-index: 2;
        padding :0 4rem;
        transition :0.3s ease-in-out;

        @media(max-width:900px){
            padding : 0 10px;
        }

        .left{
            display :flex;
            align-items :center;
            gap :2rem;

            @media(max-width:900px){
                gap : 5px;
            }
            .brand{
                display :flex;
                align-items :center;
                justify-content : center;
                img{
                    height :4rem;
                    @media(max-width:700px){
                        height :2rem;
                    }
                }
            }

            ul{
                display :flex;
            }


            .links{
                list-style-type :none;
                gap :2rem;
                @media(max-width:900px){
                    gap : 25px;
                }
                @media(max-width:800px){
                    gap : 15px;
                }
                li{
                    display: flex;
                    align-items: center;
                    justify-content : center;
                    a{
                        color :white;
                        text-decoration :none;
                        transition : 0.7s ease-in-out;
                        &:hover{
                        }
                    }
                }
            }
        }

        .right{
            display: flex;
            align-items:center;
            gap : 1rem;
            
            button{
                background-color :transparent;
                border :none;
                cursor :pointer;

                &:focus{
                    outline :none;
                }
                svg{
                    color :#f34242;
                    font-size :1.2rem;
                }
            }
            
            .search{
                display: flex;
                gap :10px;
                align-items: center;
                justift-content: center;
                padding :0.2rem;
                padding-left :0.5rem;

                button{
                    background-color :transparent;
                    border: none;
                    &:focus{
                        outline: none;
                    }

                    svg{
                        color :white;
                        font-size :1.2rem;
                    }
                }

                input{
                    width :0;
                    opacity :0;
                    visibility: visible;
                    transition: 0.7s ease-in-out;
                    background-color: transparent;
                    border: none;
                    color: white;
                    font-size :18px;
                    &:focus {
                        outline: none;
                        border-bottom: 1px solid #ffffff;;
                        background-color: transparent;
                    }
                }
            }

            .show-search{
                input{
                    width :100%;
                    border-bottom: 1px solid #ffffff;
                    opacity: 1;
                    visibility : visible;
                    padding :0.3rem;
                }
            }
        }
    }
`
export default Navbar