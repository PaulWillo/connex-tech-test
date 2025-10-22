import {
  Box,
  Card,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Person } from '@mui/icons-material';
import { useGetAgents, useGetCustomers, useGetInteractions, useGetReports } from '../../lib/api';
import { useState } from 'react';
import { useLanguage } from '../Context';
import TableHeader from './TableHead';
import ReportTableBody from './TableBody';

export const ReportList = () => {
  const { data: response, isLoading } = useGetReports();
  const { reportTable } = useLanguage();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState<string>("");
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');

  const reports = response?.data.data ?? [];

  const headers = reports.length ? Object.keys(reports[0]) : [];

  const filteredReports = reports.filter((report: any) => {
    if (!filterName) return true;
    return report.agent_name
      ?.toLowerCase()
      .includes(filterName.toLowerCase());
  });

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

  const sortedReports = orderBy
  ? [...filteredReports].sort(getComparator(order, orderBy))
  : filteredReports;

  const paginatedReports = sortedReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

   const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

return (
  <TableContainer component={Card}>
    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {reportTable.table_header}
      </Typography>
      <TextField
        label="Search Agent Name"
        variant="outlined"
        size="small"
        value={filterName}
        onChange={(e) => {
          setFilterName(e.target.value);
          setPage(0); // reset page on filter change
        }}
        disabled={isLoading} // optionally disable while loading
      />
    </Box>

    {isLoading ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <>
        <Table>
          <TableHeader
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            order={order}
            headers={headers}
          />
          <ReportTableBody paginatedReports={paginatedReports} headers={headers} />
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredReports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    )}
  </TableContainer>
);
};
