import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { signOut } from '../api/auth';
import { getMonthlyTime } from '../api/request';

const Header = ({ headerHeight, activeComponent }) => {
  const [open, setOpen] = useState(false);
  const [monthlyTime, setMonthlyTime] = useState(0);
  const anchorRef = useRef(null);
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMonthlyTime(new Date().getMonth() + 1).then(res => {
      setMonthlyTime(res.data);
    }).catch(err => console.error('Failed to get monthly time:', err));
  }, [activeComponent]);

  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await signOut();
    navigate('/signin');
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        height: headerHeight,
        borderBottom: 1,
        backgroundColor: '#f5f5f5',
        borderColor: '#a9a9a9',
      }}
    >
      <Toolbar>
        <Box sx={{ backgroundColor: "black", width: 125, height: 64 }} />
        <div style={{ margin: 24, color: "#434343", display: "flex", alignItems: "center" }}>
          <AccessTimeIcon />
          <text style={{ margin: 0 }}>{`　${(monthlyTime / 3600).toFixed(1)}h　Monthly time`}</text>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={handleToggle}
          ref={anchorRef}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header;