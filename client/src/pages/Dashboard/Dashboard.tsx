import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomizedDialogs from "../../components/UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  auth,
  deletePasswords,
  getPasswords,
  login,
} from "../../actions/user";
import { logout } from "../../reducers/userReducer";
import Navbar from "../../components/UI/Navbar/Navbar";

const passwords = [
  {
    number: 1,
    name: "email",
    password: "123123",
  },
  {
    number: 2,
    name: "staff",
    password: "123123",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state);
  // @ts-ignore
  const { user, passwords } = currentUserInfo;
  const isAuth = user.isAuth;
  const userId = user.currentUser.id;
  const arrOfPasswords = passwords.data;
  const userName = user.currentUser.email;
  const deletePass = async (id: string) => {
    await deletePasswords(id);
    // @ts-ignore
    dispatch(getPasswords(userId));
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getPasswords(userId));
  }, []);

  return (
    <>
      {isAuth && (
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {`Password manager of "${userName}"`}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {`Hello, ${userName}, here you could save you passwords and be sure that
                  it safe`}
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <CustomizedDialogs title="Add Password" />
              </Stack>
            </Container>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arrOfPasswords.map((pass: any, index: number) => (
                  <TableRow
                    key={pass._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {pass.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {pass.password}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Show Password"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <CustomizedDialogs title="Edit" id={pass._id} />
                        <Button
                          variant="outlined"
                          onClick={() => deletePass(pass._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      )}
    </>
  );
};

export default Dashboard;
