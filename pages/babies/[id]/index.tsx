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
  Grid,
  Modal,
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
import { MeasureTypes, Measures } from '@/types/Measure';
import { MeasureEditor } from '@/components/measureEditor';
import { HotTub } from '@mui/icons-material';

export default function BabyOverviewPage({}) {
  const actions = [
    {
      icon: <MonitorWeightIcon />,
      text: Measures.Weight,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Weight as MeasureTypes,
        });
      },
    },
    {
      icon: <RestaurantMenuIcon />,
      text: Measures.Feeding,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Feeding as MeasureTypes,
        });
      },
    },
    {
      icon: <ThermostatIcon />,
      text: Measures.Temperature,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Temperature as MeasureTypes,
        });
      },
    },
    {
      icon: <BabyChangingStationIcon />,
      text: Measures.Diaper,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Diaper as MeasureTypes,
        });
      },
    },
    {
      icon: <BoltIcon />,
      text: Measures.Vitamines,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Vitamines as MeasureTypes,
        });
      },
    },
    {
      icon: <HotTub />,
      text: Measures.Bath,
      action: () => {
        setEditorData({
          showEditor: true,
          measureType: Measures.Bath as MeasureTypes,
        });
      },
    },
  ];
  const router = useRouter();
  const [editorData, setEditorData] = React.useState<{
    showEditor: boolean;
    measureType?: MeasureTypes;
  }>({ showEditor: false });

  const { data, loading, refresh, setQuery, query } = useBabyById();

  const changeDate = (direction: 1 | -1) => {
    const oldDate =
      query?.date === undefined || query == null ? DateTime.utc() : query.date;
    router.push(
      `/babies/${query?.id}?date=${oldDate
        .plus(Duration.fromObject({ day: direction }))
        .toFormat('yyyy-MM-dd')}`
    );
  };

  useEffect(() => {
    getData(router.query);
  }, [router.query]);

  const getData = async (query: { id?: string; date?: string }) => {
    if (query.date === 'null') {
      query.date = undefined;
    }
    if (query?.id !== undefined) {
      setQuery({
        id: query!.id! as string,
        date:
          query.date === undefined
            ? DateTime.utc().startOf('day')
            : DateTime.fromFormat(query.date, 'yyyy-MM-dd'),
      });
    }
  };

  const handleClose = () => {
    setEditorData({ showEditor: false });
  };

  return (
    <>
      <Box>
        <Button color="primary" href="/">
          <ChevronLeftIcon /> Home
        </Button>
      </Box>
      <Box>
        <Grid container spacing={1} alignContent={'center'} width={'100%'}>
          <Grid xs={2}>
            <Button
              color="info"
              variant="contained"
              onClick={() => changeDate(-1)}
            >
              <ChevronLeftIcon />
            </Button>
          </Grid>
          <Grid xs={4}>
            {' '}
            <Typography textAlign={'center'}>
              {query?.date?.toFormat('dd-MM-yyyy') ?? 'nop'}
            </Typography>
          </Grid>
          <Grid xs={2} justifyContent={'right'}>
            <Button
              color="info"
              variant="contained"
              onClick={() => changeDate(1)}
            >
              <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
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
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.text}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={action.text}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
      <Modal
        open={editorData.showEditor}
        onClose={handleClose}
        disableEnforceFocus={false}
      >
        <MeasureEditor
          babyId={data?.baby?.id}
          measureType={editorData.measureType}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
}

BabyOverviewPage.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};
