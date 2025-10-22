import { TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLanguage } from "../Context";

const TableHeader = ({setOrder, setOrderBy, orderBy, order, headers}) => {
const { tableHeaders } = useLanguage();


  const handleRequestSort = (property: string) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

  return (
     <TableHead>
        <TableRow>
          {headers.map((header) => (
            <Tooltip key={header} title="Click to sort" arrow>
            <TableCell
              key={header}
              sx={{ fontWeight: "bold", cursor: 'pointer' }}
              onClick={() => handleRequestSort(header)}
            >
              {tableHeaders[header]}
              {orderBy === header ? (order === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />) : null}
            </TableCell>
            </Tooltip>
          ))}
        </TableRow>
      </TableHead>
  )
};

export default TableHeader;