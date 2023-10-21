import jwt from "jsonwebtoken";
import Movie from "../models/Movie";



export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];  //bearer token 
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" });
    }
 
    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (error, decrypted) => {
        if (error) {
            return res.status(400).json({ message: `${error.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    //create new movie
    const { title, description, releaseDate, posterUrl, featured,actors } = req.body;
    if (!title &&
        title.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !posterUrl &&
        posterUrl.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    
    let movie;
    try {
        movie = new Movie({
          description,
          releaseDate: new Date(`${releaseDate}`),
          featured,
          actors,
          admin: adminId,
          posterUrl,
          title,
        });
        movie = await movie.save();
     } catch (error) {
        return console.log(error);
    }

    if (!movie) {
        return res.status(500).json({ message: "Request Failed" });
    }

    return res.status(201).json({ movie });
};