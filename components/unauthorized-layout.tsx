import { Container } from '@mui/material';

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
