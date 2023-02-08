import { PropsWithChildren } from "react";
import {
    Box, 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    TextField, 
    Button,
  } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';



export type RegistrationProps = PropsWithChildren<{
    handleRegistration: () => {
        // TODO: после внедрения react-router сделать переход на страницу игры через useNavigate
      };
  }>;
  // {handleRegistration}: RegistrationProps
export const Registration = () => {
    return (
        <Box className="login"
        component="form" 
        // onSubmit={handleRegistration}
        noValidate sx={{
            display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
          width: "30%",
          background: "linear-gradient(152.97deg, rgba(0, 0, 0, 0.4655) 15.24%, rgba(0, 0, 0, 0.95) 115.24%)",
        }}>
        
      <Card sx={{
        background: "transparent",
        width: "100%",
      }}>
        <Box className="back-icon" component="div" 
        sx={{
        mt: "14px",
        pl: "14px",
        width: "100%", 
        border: '1px dashed grey' }}><ArrowBackRoundedIcon sx={{ color: "#FFF" }}/></Box>
        <CardHeader
          title="Registration"
          sx={{
          textAlign: "center"
        }}
        />
        <CardContent>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
        <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
            />
        <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
        />
        <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="name"
        />
        <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
        />
        <TextField
              margin="normal"
              required
              fullWidth
              name="re-type-password"
              label="Re-type Password"
              type="password"
              id="re-type-password"
              autoComplete="current-password"
        />
        </CardContent>
        <CardActions sx={{
        display: "flex",
        flexDirection: "column",
          justifyContent: "center",
      }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
                Registration
            </Button>
        </CardActions>
      </Card>
      </Box>
    );
};
