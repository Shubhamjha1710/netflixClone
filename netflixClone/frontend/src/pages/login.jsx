import React, {useState } from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components'
import BackgroundImage from '../component/backgroundImage';
import Header from '../component/header'
import { useNavigate ,Link } from 'react-router-dom';
import {firebaseAuth} from '../utils/firebase-config'
function Signup() {
    const [formValues , setFormValues] = useState({
        email : "",
        password : "",
    });

    const handleLogIn = async ()=> {
        try{
            const {email, password} = formValues;
            await signInWithEmailAndPassword(firebaseAuth , email , password);
        }
        catch(error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth , (currentUser)=>{
        if(currentUser) navigate("/")
    })
    
    return (
        <Container>
            <BackgroundImage/>
            <div className="content">
                <Header/>
                <div className="body">
                    <div className="form">
                        <h1>Log In</h1>
                        <input 
                            type="email" 
                            placeholder='Email address'
                            name='email'
                            value={formValues.email}
                            onChange={(e)=>setFormValues({
                                ...formValues,
                                [e.target.name] :e.target.value,
                            })}
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name = 'password'
                            value = {formValues.password}
                            onChange={(e)=>setFormValues({
                                ...formValues,
                                [e.target.name] :e.target.value,
                            })}
                        />

                        <button className="button2" onClick={handleLogIn}>Log In</button>

                        <div className="additional">
                            <span>New to Netflix?<Link to="/signup"> Sign up now</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position : relative;
    .content{
        position : absolute;
        top: 0;
        left: 0;
        background-color : rgba(0,0,0,0.5);
        height :100vh;
        width :100vw;
        display: grid;
        grid-template-rows :10vh 90vh;
        min-width: 300px;
        
        .body{
            display :flex;
            flex-direction :column;
            align-items: center;
            justify-content :center;
            gap: 1rem;
            padding : 10px;
            min-width: 300px;
        }

        .form{
            display: flex;   
            background-color: rgba(0 , 0, 0, 0.8);
            width: 27%;
            height: 68%;
            flex-direction: column;
            padding :35px 60px 35px 60px;
            box-sizing :border-box;
            border-radius :30px;
            box-shadow : 0px 0px 25px rgba(255 , 0 , 0 , 0.8);

            @media (max-width: 1300px) {
                width : 32%;
            }
            @media (max-width: 1100px) {
                padding :35px 40px 35px 40px;
            }
            @media (max-width: 950px) {
                width : 38%;
            }
            @media (max-width: 850px) {
                width : 48%;
            }
            @media (max-width: 650px) {
                width : 58%;
            }
            @media (max-width: 500px) {
                width : 75%;
            }
            @media (max-width: 370px) {
                width : 90%;
                padding :35px 20px 35px 20px;
            }

            h1{
                color :white;
                margin : 10px 5px 10px 5px;
            }
            input{
                height :50px;
                color :white;
                border :none;
                padding : 1.1rem;
                font-size : 1.2rem;
                border-radius: 5px;
                background-color : #373636;
                margin: 8px 4px 8px 4px;
                &:focus{
                    outline: none; 
                }
                
                @media (max-width: 850px) {
                    margin: 4px 0px 4px 0px;
                }
            }
            ::-ms-reveal{
                filter: invert(100%);
            }
            .button2{
                height : 50px;
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.05rem;
                border-radius: 5px;
                margin: 15px 4px 15px 4px;
                
            }

            .additional{
                margin: 10px 4px 10px 4px;
                span{
                    color :#737373;
                }

                a{
                    color : #e50914;
                    text-decoration: none;
                    font-weight :bolder;
                }

                @media (max-width: 350px) {
                    margin: 5px 4px 5px 4px;
                }
            }
        }
        
        .btn{
            height :50px;
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;
            border-radius: 10px;
            border: 2px solid red;
            transition : 0.7s;
            &:hover{
                background-color :rgba(0,0,0,0.6);
            }
        }
    }
`;
export default Signup