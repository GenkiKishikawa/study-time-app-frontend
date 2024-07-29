import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type CategoryProps = {
  category: {
    id: number;
    name: string;
    color: string;
  }
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <>
      <ListItem
        secondaryAction={
          <div>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        }
      >
        <ListItemText
          sx={{ color: `${props.category.color}` }}
          primary={"●"}
        />
        <ListItemText
          primary={`${props.category.name}`}
        />
      </ListItem >
    </>
  )
};

export default Category;