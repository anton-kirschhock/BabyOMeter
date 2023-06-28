import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BlenderIcon from '@mui/icons-material/Blender';
import { Measure, Measures } from '@/types/Measure';
import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Bolt, HotTub } from '@mui/icons-material';
export interface TabData {
  hadVitamines: boolean;
  hadBath: boolean;
  lastTemperature?: number;
  totalFeeding?: number;
  weight?: number;
}
export default function TodayTab({ data }: { data?: Measure[] }) {
  const [tabData, setTabData] = React.useState<TabData>({
    hadVitamines: false,
    hadBath: false,
    lastTemperature: undefined,
    totalFeeding: undefined,
    weight: undefined,
  });

  useEffect(() => {
    reCalculate();
  }, []);

  const reCalculate = () => {
    const d = {
      hadVitamines:
        data?.some((e) => e.Measure === Measures.Vitamines && e.Value === 1) ??
        false,
      hadBath:
        data?.some((e) => e.Measure === Measures.Bath && e.Value === 1) ??
        false,
      totalFeeding: 0,
      lastTemperature:
        data
          ?.filter((e) => e.Measure === Measures.Temperature)
          ?.sort(
            (a, b) =>
              DateTime.fromISO(a.CreatedAt!).diff(
                DateTime.fromISO(b.CreatedAt!),
                'milliseconds'
              ).milliseconds
          )
          ?.at(0)?.Value ?? undefined,
      weight:
        data
          ?.filter((e) => e.Measure === Measures.Weight)
          ?.sort(
            (a, b) =>
              DateTime.fromISO(a.CreatedAt!).diff(
                DateTime.fromISO(b.CreatedAt!),
                'milliseconds'
              ).milliseconds
          )
          ?.at(0)?.Value ?? undefined,
    };
    data
      ?.filter((e) => e.Measure === Measures.Feeding)
      ?.forEach((e) => (d.totalFeeding += e.Value ?? 0));
    setTabData(d);
  };
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: tabData.hadVitamines ? 'green' : 'red' }}>
            <Bolt />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Vitamines"
          secondary={tabData.hadVitamines ? 'Yes' : 'No'}
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: tabData.hadBath ? 'green' : 'red' }}>
            <HotTub />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Bath"
          secondary={tabData.hadBath ? 'Yes' : 'No'}
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: tabData.lastTemperature !== undefined ? 'green' : 'red',
            }}
          >
            <ThermostatIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Last Temperature"
          secondary={
            tabData.lastTemperature === undefined
              ? '-'
              : tabData.lastTemperature
          }
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: (tabData.totalFeeding ?? 0) > 0 ? 'green' : 'red',
            }}
          >
            <RestaurantMenuIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Total feeding"
          secondary={`${tabData.totalFeeding ?? 0}ml`}
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: tabData.weight !== undefined ? 'green' : 'red',
            }}
          >
            <ScaleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Weight"
          secondary={tabData.weight === undefined ? '-' : `${tabData.weight}g`}
        />
      </ListItem>
    </List>
  );
}
