import useBabyById from '@/datahooks/useBabyById';
import { supabase } from '@/lib/supabaseClient';
import { Baby } from '@/types/Baby';
import { DateTime, Duration } from 'luxon';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import BoltIcon from '@mui/icons-material/Bolt';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {
  Box,
  Button,
  Card,
  Paper,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from '@mui/material';
import { delayAsync } from '@/lib/delayAsync';
import RootLayout from '@/components/layout';
import Link from 'next/link';
import { BabyOverview } from '@/components/babyOverview';
import { dir } from 'console';
import { Measures } from '@/types/Measure';

export default function BabyOverviewPage({}) {
  const actions = [
    { icon: <MonitorWeightIcon />, text: Measures.Weight, action: () => {} },
    { icon: <RestaurantMenuIcon />, text: Measures.Feeding, action: () => {} },
    { icon: <ThermostatIcon />, text: Measures.Temperature, action: () => {} },
    {
      icon: <BabyChangingStationIcon />,
      text: Measures.Diaper,
      action: () => {},
    },
    { icon: <BoltIcon />, text: Measures.Vitamines, action: () => {} },
  ];
  const router = useRouter();
  const { data, loading, refresh, setQuery, query } = useBabyById();

  const changeDate = (direction: 1 | -1) => {
    const oldDate =
      query?.date === undefined || query == null
        ? DateTime.utc()
        : DateTime.fromISO(query?.date);
    router.push(
      `/babies/${query?.id}?date=${oldDate
        .plus(Duration.fromObject({ day: direction }))
        .toISO()}`
    );
  };

  useEffect(() => {
    getData();
  }, [router.query]);

  const getData = async () => {
    if (router?.query?.id !== undefined) {
      setQuery({
        id: router.query!.id! as string,
        date: (router.query.date ?? DateTime.utc().toISODate()) as string,
      });
      await refresh();
    }
  };

  return (
    <>
      <Box>
        <Button color="primary" href="/">
          <ChevronLeftIcon /> Home
        </Button>
      </Box>
      <Box>
        <Button color="info" variant="contained" onClick={() => changeDate(-1)}>
          <ChevronLeftIcon />
        </Button>
        {query?.date}
        <Button color="info" variant="contained" onClick={() => changeDate(1)}>
          <ChevronRightIcon />
        </Button>
      </Box>

      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={118} />
      ) : (
        <>
          <BabyOverview.DetailCard data={data?.baby} />
          <BabyOverview.Tabs data={data} />
        </>
      )}
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.text}
            icon={action.icon}
            tooltipTitle={action.text}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </>
  );
}

BabyOverviewPage.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};
