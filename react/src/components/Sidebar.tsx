import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DvrIcon from '@mui/icons-material/Dvr';
import WatchIcon from '@mui/icons-material/Watch';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom'

const drawerWidth = 150

export const Sidebar = () => {

  const navigate = useNavigate(); // ナビゲーション関数を初期化

  // サイドバーのアイテムクリックに反応する関数
  const handleNavigation = (path: any) => {
    navigate(path); // ナビゲート関数を呼び出し
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          zIndex: (theme) => theme.zIndex.modal + 1,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List >
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <DvrIcon />
            </ListItemIcon>
            <ListItemText secondary="Time Reacords" />
            <></>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/timer')}>
            <ListItemIcon>
              <WatchIcon />
            </ListItemIcon>
            <ListItemText secondary="Timer" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText secondary="Stats" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}