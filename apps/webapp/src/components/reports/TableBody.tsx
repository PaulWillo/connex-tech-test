import {
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useLanguage } from '../Context';

const ReportTableBody = ({
  paginatedReports,
  headers,
}: {
  paginatedReports: any[];
  headers: any;
}) => {
  const { reportTable } = useLanguage();

  return (
    <TableBody>
      {paginatedReports.map((row: any, index: number) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header}>{row[header]}</TableCell>
          ))}
        </TableRow>
      ))}

      {paginatedReports.length === 0 && (
        <TableRow>
          <TableCell colSpan={headers.length} align="center">
            {reportTable.no_matching_agents}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ReportTableBody;
