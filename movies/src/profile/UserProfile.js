import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBooking, getUserDetails } from "../components/api-helpers/api-helpers";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((error) => console.log(error));
  }, []);

  getUserDetails().then((res) => setUser(res.user))
   .catch((error)=>console.log(error)) ;
  
  const handleDelete = (id) => {
    deleteBooking(id).then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <Box width="100%" display="flex">
     
        <Fragment>
          {" "}
        {user && (   <Box
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              mt={1}
              width="auto"
              border="1px solid #ccc"
              textAlign={"center"}
              padding={1}
              borderRadius={6}
            >
              Name:{user.name}
            </Typography>
            <Typography
              width="auto"
              border="1px solid #ccc"
              textAlign={"center"}
              padding={1}
              borderRadius={6}
            >
              Email:{user.email}
            </Typography>
        </Box>
        )}
        {bookings && 
          (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign={"center"}
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display={"flex"}
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItem
                      sx={{
                        width: "auto",
                        textAlign: "left",
                        margin: 1,
                      }}
                    >
                      Movie:{booking.movie.title}
                    </ListItem>
                    <ListItem
                      sx={{
                        width: "auto",
                        textAlign: "left",
                        margin: 1,
                      }}
                    >
                      Seat:{booking.seatNumber}
                    </ListItem>
                    <ListItem
                      sx={{
                        width: "auto",
                        textAlign: "left",
                        margin: 1,
                      }}
                    >
                      Date:{new Date(booking.date).toDateString()}
                    </ListItem>
                    <IconButton onClick={() => handleDelete(booking._id)}
                      color="error">
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
        </Box>
        )}
        </Fragment>
    
    </Box>
  );
};

export default UserProfile;
