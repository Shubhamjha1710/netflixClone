import React from 'react'
import background from '../image/login.jpg'
import styled from 'styled-components'
function BackgroundImage() {
    return (
        <Container>
            <img src={background} alt="background" />
        </Container>
    )
}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    min-width: 300px;
    img{
        height :100vh;
        width :100vw;
        min-width: 300px;
    }
`; 
export default BackgroundImage