import axios from "axios";

export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("No Data");
    }
  } catch (error) {
    throw new Error("Failed to fetch movies: " + error.message);
  }
};

export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error("Unexpected Error Occurred");
    }
  } catch (error) {
    throw new Error("User authentication failed: " + error.message);
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Unexpected Error");
    }
  } catch (error) {
    throw new Error("Admin authentication failed: " + error.message);
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to fetch movie details. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`);
  }
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userid");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterurl: data.posterurl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    return console.log("unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }
  const resData = await res.data;
  return resData;
};
