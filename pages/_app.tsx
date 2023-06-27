import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

export default function MyApp({ Component, pageProps }: any) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      {getLayout(<Component {...pageProps} />)}
    </LocalizationProvider>
  );
}
