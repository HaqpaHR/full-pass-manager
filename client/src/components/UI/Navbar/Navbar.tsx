import React from "react";
import Button from "@mui/material/Button";
import { logout } from "../../../reducers/userReducer";
import { Box, Stack } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {reduxStore} from "../../../types";
import {AppDispatch} from "../../../reducers";

const Navbar = () => {
  const router = useNavigate();
  const isAuth = useSelector((state: reduxStore) => state.user.isAuth);
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" margin="20px">
        <Box>
          {isAuth && <Button variant="contained" onClick={() => dispatch(logout())}>Log out</Button>}
        </Box>
        <Box>
          {!isAuth && <Button variant="contained" onClick={() => router('/login')}>Log in</Button>}
          {!isAuth && <Button variant="contained" onClick={() => router('/registration')}>Registration</Button>}
        </Box>
      </Stack>
    </div>
  );
};

export default Navbar;
