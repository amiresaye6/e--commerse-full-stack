import { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useTheme } from '@mui/material/styles';

const SignupCard = () => {
//   const theme = useTheme(); // For detecting light/dark mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordCriteria({
      hasLetter: /[a-zA-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[!@#$%^&*]/.test(value),
    });
  };

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordMatch = confirmPassword === '' || password === confirmPassword;

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '10vh', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center">Sign Up</Typography>
        <form>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            error={!isEmailValid}
            helperText={isEmailValid ? '' : 'Please enter a valid email'}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Password Criteria */}
          <div>
            <Typography variant="body2" color={passwordCriteria.hasLetter ? 'green' : 'error'}>
              {passwordCriteria.hasLetter ? '✓' : '✗'} At least one letter
            </Typography>
            <Typography variant="body2" color={passwordCriteria.hasNumber ? 'green' : 'error'}>
              {passwordCriteria.hasNumber ? '✓' : '✗'} At least one number
            </Typography>
            <Typography variant="body2" color={passwordCriteria.hasSpecialChar ? 'green' : 'error'}>
              {passwordCriteria.hasSpecialChar ? '✓' : '✗'} At least one special character
            </Typography>
          </div>

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
            error={!isPasswordMatch}
            helperText={isPasswordMatch ? '' : 'Passwords do not match'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
            label="Remember me"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
