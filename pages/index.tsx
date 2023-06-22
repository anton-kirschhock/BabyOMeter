import RootLayout from '@/components/layout';
import { supabase } from '@/lib/supabaseClient';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';

export default function Index() {
  const [babies, setBabies] = React.useState<any[] | null>();
  const [loading, setLoading] = React.useState(false);
  const { push } = useRouter();
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await supabase.from('Babies').select();
    setBabies(data);
  };

  const navigateToDetail = (id: any) => {
    push(`/babies/${id}`);
  };

  return (
    <Suspense fallback={<p>loading...</p>}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {babies?.map((row) => (
              <TableRow
                onClick={() => navigateToDetail(row.id)}
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.['Full Name']}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  );
}

Index.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};
