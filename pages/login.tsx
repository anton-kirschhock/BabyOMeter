import AuthForm from '@/app/auth/auth-form';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

export default function Login() {
  return (
    <Container maxWidth="sm">
      <AuthForm />
    </Container>
  );
}
