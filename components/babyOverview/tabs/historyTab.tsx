import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from '@mui/material';
import { DiaperTypes, Measure, Measures } from '@/types/Measure';
import { supabase } from '@/lib/supabaseClient';
import { DateTime } from 'luxon';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import BoltIcon from '@mui/icons-material/Bolt';
import { HotTub } from '@mui/icons-material';

export function TimelineEntry({ data }: { data: Measure }) {
  const getValue = (value: number, measureType: string) => {
    switch (measureType) {
      case Measures.Diaper:
        return <Typography>{DiaperTypes[value]}</Typography>;
      case Measures.Temperature:
        return <Typography>{value} C</Typography>;
      case Measures.Weight:
        return <Typography>{value} g</Typography>;

      case Measures.Feeding:
        return <Typography>{value} ml</Typography>;

      default:
        return undefined;
    }
  };

  const getDotIcon = (measureType: string) => {
    switch (measureType) {
      case Measures.Temperature:
        return <ThermostatIcon />;
      case Measures.Weight:
        return <MonitorWeightIcon />;
      case Measures.Diaper:
        return <BabyChangingStationIcon />;
      case Measures.Feeding:
        return <RestaurantMenuIcon />;
      case Measures.Vitamines:
        return <BoltIcon />;
      case Measures.Bath:
        return <HotTub />;
    }
  };
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {DateTime.fromISO(data.CreatedAt!).toLocaleString(
          DateTime.DATETIME_SHORT
        )}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>{getDotIcon(data.Measure!)}</TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span">
          {data.Measure}
        </Typography>
        {getValue(data.Value!, data.Measure!)}
      </TimelineContent>
    </TimelineItem>
  );
}

export function HistoryTab({ babyId }: { babyId?: number }) {
  const [data, setData] = React.useState<Measure[] | undefined>();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const measures = await supabase
      .from('Measure')
      .select('*')
      .eq('BabyId', babyId)
      .order('CreatedAt', { ascending: false });
    setData(measures?.data ?? undefined);
  };
  return (
    <>
      {data === undefined ? (
        <></>
      ) : (
        <Timeline position="alternate">
          {data?.map((e) => (
            <TimelineEntry key={e.id} data={e} />
          ))}
        </Timeline>
      )}
    </>
  );
}
