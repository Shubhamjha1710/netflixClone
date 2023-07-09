import React, {useState } from 'react'
import { createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components'
import BackgroundImage from '../component/backgroundImage';
import Header from '../component/header'
import { useNavigate } from 'react-router-dom';
import {firebaseAuth} from '../utils/firebase-config'
function Signup() {
    const [showPassword , setshowPassword] = useState(false);
    const [formValues , setFormValues] = useState({
        email : "",
        password : "",
    });

    const handleSignUp = async ()=> {
        try{
            const {email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth , email , password);
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
        <Container showPassword={showPassword}>
            <BackgroundImage/>
            <div className="content">
                <Header login/>
                <div className="body">
                    <div className="text">
                        <h1>Unlimited movies , Tv shows and more.</h1>
                        <h4>Watch anywhere. Cancel anytime</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className="form">
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
                        { 
                            showPassword && (
                            <input 
                                type="password" 
                                placeholder='Password'
                                name = 'password'
                                value = {formValues.password}
                                onChange={(e)=>setFormValues({
                                    ...formValues,
                                    [e.target.name] :e.target.value,
                                })}
                            />)
                        }
                        {
                            !showPassword && (
                                <button onClick={()=>setshowPassword(true)}>Get Started</button>
                            )
                        }
                    </div>
                    {
                        showPassword && (<button className='btn' onClick={handleSignUp}>Sign Up</button>)
                    }
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

            .text{
                gap: 1rem;
                text-align: center;
                font-size : 2rem;
                display :flex;
                flex-direction: column;
                color: white;
                
                @media(max-width :900px){
                    font-size : 1.4rem;
                }
                @media(max-width :550px){
                    font-size : 1.2rem;
                }
            }
        }

        .form{
            display: grid;
            grid-template-columns : ${({showPassword}) => showPassword ? "1fr 1fr" : "2fr  1fr"};
            width : 40%;

            @media (max-width: 1300px) {
                width:55%;
            }
            @media (max-width: 1000px) {
                width:60%;
            }
            @media (max-width: 850px) {
                display: flex;
                flex-direction :column;
            }

            input{
                color :white;
                border :none;
                padding : 1.1rem;
                font-size : 1.2rem;
                border : 2px solid red;
                border-radius: 10px;
                background-color : rgba(0,0,0,0.6);
                margin: 0px 4px 0px 3px;
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
            
            button{
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.05rem;
                border-radius: 10px;
                margin: 0px 4px 0px 3px;
                
                @media (max-width: 850px) {
                    margin: 4px 0px 4px 0px;
                    height :50px;
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