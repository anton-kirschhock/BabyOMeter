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
  ];
  const router = useRouter();
  const [editorData, setEditorData] = React.useState<{
    showEditor: boolean;
    measureType?: MeasureTypes;
  }>({ showEditor: false });

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
  }, [router.query?.id]);

  const getData = async () => {
    if (router?.query?.id !== undefined) {
      setQuery({
        id: router.query!.id! as string,
        date: (router.query.date ?? DateTime.utc().toISODate()) as string,
      });
      await refresh();
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
