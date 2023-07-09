import React from 'react'
import {styled} from 'styled-components';
function NotFound() {
    return (
        <Container >
            <h1 className="not-available">
                {
                    `No Movies avaialble for the selected genre. Please select a different
                    genre.`
                }
            </h1>
        </Container>
    );
}

const Container = styled.div`
    h1{
        color :white;
    }
`
export default NotFound;