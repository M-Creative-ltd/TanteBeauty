import KeystaticApp from './keystatic';
import KeystaticLogoutButton from './KeystaticLogoutButton';

export default function RootLayout() {
  return (
    <>
      <KeystaticLogoutButton />
      <KeystaticApp />
    </>
  );
}
