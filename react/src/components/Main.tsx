import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Pagination,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const drawerWidth = 120;

const timeRecords = [
  { id: 1, duration: '1.5h', start: '2024/07/08 12:30', end: '2024/07/08 14:00' },
  // More records...
];

export const Main = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <List>
          {timeRecords.map((record) => (
            <ListItem key={record.id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }>
              <AccessTimeIcon style={{ marginRight: '10px' }} />
              <ListItemText primary={`${record.duration} ${record.start} ~ ${record.end}`} />
            </ListItem>
          ))}
        </List>
        <Pagination count={10} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
      </Box>
    </Box>
  );
}
