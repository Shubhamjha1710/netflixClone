import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../image/logo.png'

function Header(props) {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <button className='btn' onClick={()=>navigate(props.login ? "/login" : "/signup")}>
                { props.login ? "Log In" : "Sign Up" }
            </button>
        </Container>
    )
}

const Container = styled.div`
    padding : 0 3rem;
    display :flex;
    align-items: center;
    justify-content :space-between;
    min-width: 300px;
    
    @media(max-width:550px){
        padding : 0 15px;
    }
    
    .logo{
        img{
            height :5rem;        
            @media(max-width:400px){
                height: 55px;
            }
        }
    }
  
    .btn{
        height : 50px;
        background-color :#e50914;
        border: none;
        cursor: pointer;
        color : white;
        border-radius: 10px;
        font-weight :bolder;
        font-size :1.05rem;
        border: 2px solid red;
        transition : 0.7s;
        &:hover{
            background-color :rgba(0,0,0,0.6);
            padding :0.5rem 1rem;
        }
    }
`;
export default Header