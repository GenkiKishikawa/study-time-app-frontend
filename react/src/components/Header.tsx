import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, MouseEvent } from 'react';
import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { signOut } from '../api/auth';
import { getMonthlyTime } from '../api/request';

interface HeaderProps {
  headerHeight: number;
  activeComponent: string;
}

const Header: React.FC<HeaderProps> = ({ headerHeight, activeComponent }) => {
  const [open, setOpen] = useState(false);
  const [monthlyTime, setMonthlyTime] = useState(0);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchMonthlyTime = async () => {
      try {
        const response = await getMonthlyTime(new Date().getMonth() + 1);
        setMonthlyTime(response.data);
      } catch (err) {
        console.error('Failed to get monthly time:', err);
      }
    };
    fetchMonthlyTime();
  }, [activeComponent]);

  const navigate = useNavigate();

  const handleLogout = async (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
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
        <Box sx={{ margin: 3, color: "#434343", display: "flex", alignItems: "center" }}>
          <AccessTimeIcon />
          <Box sx={{ ml: 1 }}>{`${(monthlyTime / 3600).toFixed(1)}h Monthly Time`}</Box>
        </Box>
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
  );
};

export default Header;
