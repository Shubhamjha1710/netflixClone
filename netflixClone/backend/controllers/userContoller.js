const User = require('../models/userModel.js');

module.exports.getLikedMovies = async(req , res)=>{
    try{
        const {email } = req.params
        const user = await User.findOne({email});
        if(user){
            return res.json({
                msg : "success" ,
                movies : user.likedMovies
            });
        }
        else{
            return res.json({
                msg :"User with given email not found"
            })
        }
    } catch(err){
        return res.json({
            msg : "Error in fetching the movies",
        })
    }
}

module.exports.addToLikedMovies = async(req , res)=>{
    try{
        const {email , data} = req.body;
        const user = await User.findOne({email});
        if(user){
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => 
                id === data.id
            )
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate( user._id, {
                        likedMovies :[...user.likedMovies , data]
                    },{
                        new : true,
                    }
                )
            }
            else {
                return res.json({
                    msg : "Movie is already Added",
                })
            }
        } 
        else{
            await User.create({
                email ,
                likedMovies : [data]
            })
        }
        return res.json({
            msg : 'Movie successfully added to liked list'
        })
    } catch (err){
        return res.json({
            msg : "Error Adding Movie",
        })
    }
}

module.exports.removeFromLikedMovies = async(req , res)=>{
    try{
        const {email , movieId} = req.body;
        const user = await User.findOne({email});
        if(user){
            const movies = User.likedMovies;
            const movieIndex = movie.findIndex(({id}) => id === movieId);
            if(!movieIndex){
                res.status(4000).send({
                    msg : "Movie not Found",
                })
            }
            movies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(user._id , {
                likedMovies : movies,
            },{
                new :true,
            });
            return res.json({
                msg : "Movie is successfully removed from list"
            })
        }
        else{
            return res.json({
                msg : "User with given email not found",
            })
        }
    } 
    catch (err){
        return res.json({
            msg : "Error in removing movie from liked list",
        })
    }
}