import {
  Card,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useGetAgents, useGetCustomers, useGetInteractions, useGetReports } from '../../lib/api';

export const ReportList = () => {
  const { data } = useGetReports();

  console.log('data', data);
  const agents = data?.data;

  return (
    <Card>
        {/* {agents?.map((x) => x.agent_name)} */}
    </Card>
  );
};
