import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { signOut } from '../../api/auth';
import { getMonthlyTime, putUser, getUser } from '../../api/request';

interface HeaderProps {
  headerHeight: number;
}

const Header: React.FC<HeaderProps> = ({ headerHeight }) => {
  const [open, setOpen] = useState(false);
  const [monthlyTime, setMonthlyTime] = useState(0);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isOpenAccountModal, setIsOpenAccountModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const handleToggle = (_: MouseEvent<HTMLElement>) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAccountModal = () => {
    setIsOpenAccountModal(true);
  };

  const handleCloseAccountModal = () => {
    setIsOpenAccountModal(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitImage = async () => {
    await putUser({ image });
    setIsOpenAccountModal(false);
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
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response.data.user);
        setImage(response.data.imageUrl);
      } catch (err) {
        console.error('Failed to get user:', err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    await signOut();
    navigate('/signin');
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
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
        <Box>
          <IconButton
            onClick={handleToggle}
            ref={anchorRef}
          >
            {
              image ?
                <Avatar src={`${image}`} sx={{ border: 0.5, backgroundColor: "#434343", width: 30, height: 30 }} />
                :
                <AccountCircleIcon sx={{ color: "#434343", width: 30, height: 30 }} />
            }
            <ArrowDropDownIcon sx={{ color: "#434343", width: "17px" }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOpenAccountModal}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      <Dialog open={isOpenAccountModal} onClose={handleCloseAccountModal}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitImage}
            variant="contained"
            color="primary"
          >
            続ける
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
