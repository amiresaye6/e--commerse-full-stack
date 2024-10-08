import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignupCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordMatch && passwordCriteria.hasLetter && passwordCriteria.hasNumber && passwordCriteria.hasSpecialChar) {
      const result = await dispatch(signupUser({ name, email, password }));
      if (!result.error) {
        navigate('/login');
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '10vh', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center">Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
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
            required
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

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
            required
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
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        <Button
          onClick={() => navigate('/login')}
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Already have an account? Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignupCard;