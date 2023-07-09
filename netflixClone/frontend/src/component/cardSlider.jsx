import React, {useRef} from 'react'
import {styled} from 'styled-components'
import Card from './card';

function CardSlider({data , title}) {
    const listRef = useRef();
    
    return (
        <Container>
            <h1>{title}</h1>
            <div className="wrapper">
                <div className="slider" ref={listRef}>
                    {
                        data.map((movie , index) => {
                            return <Card movieData={movie} index = {index} key = {movie.id}/>
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display :flex;
    flex-direction : column;
    position : relative; 
    padding : 20px;
    margin :0px 30px 0px 30px;
    h1{
        color :white;
        margin : 10px 10px 10px 10px;
    }
    
    .wrapper{
        display : flex; 
        ::-webkit-scrollbar{
            height: 5px;
        }
        ::-webkit-scrollbar-thumb
        {
            background: rgba(255,255,255,0.6);
            border-radius: 10px;
        }

        .slider{
            overflow :scroll;
            overflow-Y : hidden;
            display :flex;
            transform : translateX(0px);
            transition : 0.3s ease-in-out;
        }
    }
`
export default CardSlider