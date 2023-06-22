import { BabyByIdViewModel } from '@/datahooks/useBabyById';
import { Baby } from '@/types/Baby';
import { Measure } from '@/types/Measure';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React from 'react';
import TodayTab from './tabs/todayTab';
import { HistoryTab } from './tabs/historyTab';
const BabyOverviewDetailCard = ({ data }: { data?: Baby }) => {
  return (
    <Card sx={{ margin: '1em' }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{data?.id}</Avatar>}
        title={<Typography variant="h5">{data?.['Full Name']}</Typography>}
        subheader={`dob: ${data?.DateOfBirth}`}
      />
    </Card>
  );
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// eslint-disable-next-line react/display-name
const BabyOverviewTabs = ({ data }: { data?: BabyByIdViewModel }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ margin: '1em' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Today..." />
            <Tab label="History" />
            <Tab label="Feeding" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TodayTab data={data?.measures} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HistoryTab babyId={data?.baby?.id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          TODO
        </TabPanel>
      </Box>
    </Card>
  );
};

export const BabyOverview = Object.assign(
  {},
  {
    DetailCard: BabyOverviewDetailCard,
    Tabs: BabyOverviewTabs,
  }
);
