import { fetchFromTMDB } from "../Services/tmdb.service.js";
import {User}from "../models/user.model.js"
export async function searchPerson(req, res) {
    // https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1
    const { query } = req.params;
  
    try {
      const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
      );
  
      if (response.results.length === 0) {
        console.log("No person found for the query:", query);
        return res.status(404).send(null);
      }
    //   console.log("User ID:", req.user._id);
    //   const user = await User.findById(req.user._id);
    //   console.log("Found User:", user);

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
  
      res.status(200).json({ success: true, content: response.results });
    } catch (error) {
      console.log("Error in search person controller:", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
export async function searchMovie(req,res) {
    const {query}=req.params;
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt: new Date()
                }
            }
           })
        res.status(200).json({success:true,data:response.results}) 
    }
    catch(error){
        console.log("error in search movie controller:" , error.message)
        res.status(500).json({success:false,messgae:"internal server error"});
    }
    
}
export async function searchTv(req,res) {
    const {query}=req.params;
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt: new Date()
                }
            }
           })
        res.status(200).json({success:true,data:response.results}) 
    }
    catch(error){
        console.log("error in search tv controller:" , error.message)
        res.status(500).json({success:false,messgae:"internal server error"});
    }
    

    
}
export async function getSearchHistory(req,res) {
    try{
        res.status(200).json({success:true,content:req.user.searchHistory});

    }
    catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }
}
export async function removeItemFromSearchHistory(req,res){
    let  {id} = req.params;
    id = parseInt(id)
    //we get a string from req.params but the id is a number
    try{
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id}
            }
        });
        res.status(200).json({success:true,message:"item removed from search history"})
    }
    catch(error){
        console.log("error in removeitemfromsearchhistory controller: ",error.message);
        res.status(500).json({success:false,message:"internal server error"})
    }
}
