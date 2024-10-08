import { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

const ContactUsCard = () => {
//   const theme = useTheme(); // For detecting light/dark mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    subject: false,
    message: false,
  });

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: !isEmailValid,
      subject: subject === '',
      message: message === '',
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.subject && !newErrors.message) {
      // Submission logic can be added here later
      console.log('Form submitted:', { name, email, subject, message });
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '10vh', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center">Contact Us</Typography>
        <form onSubmit={handleSubmit}>
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
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email' : ''}
          />

          <TextField
            label="Subject"
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            fullWidth
            margin="normal"
            error={errors.subject}
            helperText={errors.subject ? 'Subject is required' : ''}
            required
          />

          <TextField
            label="Message"
            type="text"
            value={message}
            onChange={handleMessageChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={errors.message}
            helperText={errors.message ? 'Message is required' : ''}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactUsCard;
