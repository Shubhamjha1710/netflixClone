import React from 'react'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Netflix from './pages/netflix'
import Player from './pages/player'
import Movies from './pages/movies'
import TvShow from './pages/tvShow'
import Likedlist from './pages/likedList'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/player" element={<Player/>}/>
        <Route exact path="/movies" element={<Movies/>}/>
        <Route exact path="/mylist" element={<Likedlist/>}/>
        <Route exact path="/tv" element={<TvShow/>}/>
        <Route exact path="/" element={<Netflix/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App