import useUserData from '@/hooks/useUserData';
import { supabase } from '@/lib/supabaseClient';
import { Measure, MeasureTypes, Measures } from '@/types/Measure';
import { CheckBox } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Container,
  FormControl,
  FormLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useUser } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';
import { DateTime } from 'luxon';
import React from 'react';

export function MeasureEditor({
  babyId,
  measureType,
  onClose,
}: {
  babyId?: number;
  measureType?: MeasureTypes;
  onClose: () => void;
}) {
  const [value, setValue] = React.useState(0);

  const measureSubForms = {
    Vitamines: (
      <>
        <Typography>
          All OK <CheckBox color="success" />
        </Typography>
      </>
    ),
    Bath: (
      <>
        <Typography>
          All OK <CheckBox color="success" />
        </Typography>
      </>
    ),
    Weight: (
      <>
        <TextField
          label="Weight"
          variant="outlined"
          fullWidth
          type="number"
          value={value}
          onChange={(ev) => {
            let num = parseFloat(ev.target.value);
            if (isNaN(num)) num = 0;
            if (num < 0) num *= -1;
            setValue(num);
          }}
          focused
          helperText="Measure without diaper or substract the weight of a diaper"
          InputProps={{ endAdornment: <Typography>g</Typography> }}
        />
      </>
    ),
    Diaper: (
      <>
        <ToggleButtonGroup
          value={value}
          onChange={(ev, value: number) => setValue(value)}
          exclusive
        >
          <ToggleButton value={0}>
            <Typography>Empty</Typography>
          </ToggleButton>
          <ToggleButton value={1}>
            <Typography>Wet</Typography>
          </ToggleButton>
          <ToggleButton value={2}>
            <Typography>Solid</Typography>
          </ToggleButton>
          <ToggleButton value={3}>
            <Typography>Wet & Solid</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </>
    ),
    Feeding: (
      <>
        <TextField
          label="Feeding ammount"
          variant="outlined"
          fullWidth
          type="number"
          value={value}
          onChange={(ev) => {
            let num = parseFloat(ev.target.value);
            if (isNaN(num)) num = 0;
            if (num < 0) num *= -1;
            setValue(num);
          }}
          focused
          helperText="Use the corrected measurement (make note of the start ammount)"
          InputProps={{ endAdornment: <Typography>ml</Typography> }}
        />
      </>
    ),
    Temperature: (
      <>
        <TextField
          label="Temperature"
          variant="outlined"
          fullWidth
          type="number"
          value={value}
          onChange={(ev) => {
            let num = parseFloat(ev.target.value);
            if (isNaN(num)) num = 37.0;
            setValue(num);
          }}
          focused
          color={value >= 37.5 ? 'error' : 'primary'}
          error={value >= 37.5}
          helperText={
            value >= 37.5 ? 'Temperature is higher than allowed!' : ''
          }
          InputProps={{ endAdornment: <Typography>°C</Typography> }}
        />
      </>
    ),
  };
  const [date, setDate] = React.useState<DateTime | null>(DateTime.now());
  const { userData } = useUserData();
  const onSave = async () => {
    const { data, error } = await supabase.from('Measure').insert([
      {
        BabyId: babyId,
        Value: value,
        Measure: measureType,
        CreatedAt: date?.toJSON() ?? null,
        CreatedBy: userData?.id,
      } as Measure,
    ]);

    if (error) {
      alert(error.message);
    } else {
      onClose();
    }
  };
  React.useEffect(() => {
    switch (measureType) {
      case Measures.Vitamines:
      case Measures.Bath:
        setValue(1);
        break;
      case Measures.Temperature:
        setValue(37.0);
        break;
      default:
        setValue(0);
        break;
    }
  }, [measureType]);

  return (
    <Card
      sx={{
        position: 'absolute' as 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -25%)',
        width: '90%',
        bgcolor: 'background.paper',
        p: 4,
      }}
    >
      <Typography variant="h3">Add {measureType}</Typography>
      <Box>
        <Container sx={{ pb: 3 }}>
          <DateTimePicker
            label="Date & Time"
            value={date}
            ampm={false}
            sx={{ width: '100%' }}
            onChange={(v) => setDate(v ?? null)}
          />
        </Container>

        <Container>{measureSubForms![measureType!]}</Container>
      </Box>

      <Box>
        <Typography>Value:{value}</Typography>
        <Typography>Date:{date?.toJSON()}</Typography>
      </Box>
      <CardActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="success" onClick={onSave}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
