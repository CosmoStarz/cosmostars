import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { SvgIconProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { ChangeEvent, FocusEvent, ReactElement, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { RoutesName } from "../../constants";

type FieldsType = {
  id: string;
  label: string;
  name: string;
  value: string | null;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
};
type Props = {
  className: string;
  title?: string;
  fields: FieldsType[];
  buttonName?: string;
  linkName?: string;
  handleSubmit?: () => void;
  icon?: ReactElement<SvgIconProps>;
  linkHref?: string;
};

const CardView = ({
  className,
  title,
  fields,
  handleSubmit,
  buttonName,
  linkName,
  icon,
  linkHref,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <Box
      className="form-paper"
      component="form"
      onSubmit={handleSubmit}
      noValidate>
      <Card
        sx={{
          my: "2rem",
          background: "transparent",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
          border: "none",
        }}>
        {icon && (
          <Box
            className="back-icon"
            sx={{
              pl: "14px",
              width: "100%",
            }}>
            <IconButton
              onClick={() => {
                navigate(RoutesName.LOGIN);
              }}>
              {icon}
            </IconButton>
          </Box>
        )}
        <CardHeader
          titleTypographyProps={{ variant: "h3" }}
          title={title}
          sx={{
            padding: "0px",
            textAlign: "center",
          }}
        />
        <Box
          sx={{
            width: "492px",
          }}>
          <CardContent>
            {fields.map(field => {
              return (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  helperText={field.error}
                  id={field.id}
                  value={field.value}
                  label={field.label}
                  name={field.name}
                  type={showPassword ? "text" : field.type}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  key={field.id}
                  error={!!field.error}
                  InputProps={{
                    endAdornment: field.name === "password" && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}></TextField>
              );
            })}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {buttonName}
            </Button>
            {linkName && (
              <NavLink to={linkHref ? linkHref : "#"}>
                <Typography>{linkName}</Typography>
              </NavLink>
            )}
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default CardView;
