import React from 'react'
import CardSlider from './cardSlider'
import { styled } from 'styled-components';
function Slider({movies}) {
    
    return (
        <Container>
            <CardSlider title="Trending Now" data={movies.slice(0,10)}/>
            <CardSlider title="New Release" data={movies.slice(10,20)}/>
            <CardSlider title="Blockbuster" data={movies.slice(20,30)}/>
            <CardSlider title="Netflix Popular" data={movies.slice(30,40)}/>
            <CardSlider title="Highly Rated" data={movies.slice(40,50)}/>
        </Container>
    )
}

const Container = styled.div`
    min-width: 360px;
`;
export default Slider