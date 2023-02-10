import * as React from 'react';
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
import Icon from "@mui/material/Icon";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SvgIconProps } from '@mui/material';


type FieldsType = {
    id: string;
    label: string;
    name: string;
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: any) => void;
    error?: string;
}
type Props = {
    className: string;
    title?: string;
    fields: FieldsType[];
    buttonName?: string;
    linkName?: string;
    handleSubmit?: () => void;
    icon?: SvgIconProps<'svg', any>;
};

const CardView = ({ className, title, fields, handleSubmit, buttonName, linkName, icon }: Props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    return (
        <Box className={className}
        component="form" 
        onSubmit={handleSubmit}
        noValidate sx={{
          width: "595px",
          margin: "auto",
          border: "1px solid",
          background: "linear-gradient(152.97deg, rgba(0, 0, 0, 0.4655) 15.24%, rgba(0, 0, 0, 0.95) 115.24%) ",
        }}>
            <Card sx={{
        mb: "2rem",
        mt: "2rem",
        background: "transparent",
        width: "100%",
        display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
      }}>
        { icon && <Box className="back-icon" component="div" 
        sx={{
        mt: "14px",
        pl: "14px",
        width: "100%"}}>
            <Icon>{icon}</Icon>
        </Box> }
        <CardHeader
        titleTypographyProps={{variant:'h3' }}
          title={title}
          sx={{
          textAlign: "center"
        }}
        />
        <Box sx={{
          width: "492px",
        }}>
        <CardContent>
            {fields.map(field => {
                return <TextField 
                margin="normal"
                required
                fullWidth
                helperText={field.error}
                id={field.id}
                value={field.value}
                label={field.label}
                name={field.name}
                type={showPassword ? 'text' : field.type}
                onChange={field.onChange}
                onBlur={field.onBlur}
                key={field.id}
                error={!!field.error}
                InputProps={{
                    endAdornment: field.type ==='password' && <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                ></TextField>
            })}
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
                {buttonName}
            </Button>
            {linkName && <Link href="#">
            <Typography>
                {linkName}
            </Typography>
            </Link>}
        </CardActions>
        </Box>
        </Card>
        
        </Box>
    );
};

export default CardView;
