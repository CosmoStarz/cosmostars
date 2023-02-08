import {
    Box, 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    Typography, 
    TextField, 
    Button, 
    Link } from '@mui/material';
import { PropsWithChildren } from "react";


export type LoginProps = PropsWithChildren<{
    handleLogin: () => {
        // TODO: после внедрения react-router сделать переход на страницу игры через useNavigate
      };
  }>;
  
export const Login = ({handleLogin}: LoginProps) => {
    return (
        <Box className="login"
        component="form" 
        onSubmit={handleLogin}
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
        <CardHeader
          title="Login"
          sx={{
          textAlign: "center"
        }}
        />
        <CardContent>
        <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
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
                Sign in
            </Button>
            <Link href="#">
            <Typography>
                Create account
            </Typography>
            </Link>
        </CardActions>
      </Card>
      </Box>
    );
};
