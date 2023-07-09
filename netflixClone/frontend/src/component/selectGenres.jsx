import React from 'react'
import { styled } from 'styled-components'
import { useDispatch } from 'react-redux';
import { fetchMoviesByGenre } from '../store';

function SelectGenres({genres , type}) {
  const dispatch = useDispatch();
    return (
        <Container>
            <select 
              onChange = {(e)=>{
                dispatch(fetchMoviesByGenre({
                  genre: e.target.value,
                  type,
                })) 
              }}
            >
              {
                genres.map((genre) => {
                  return (
                    <option value={genre.id} key={genre.id}>
                      {genre.name}
                    </option>
                  )
                })
              }
            </select>
        </Container>
    )
}


const Container = styled.div`
  select{
    display :flex;
    margin-left: 4rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    
  }
`;
export default SelectGenres