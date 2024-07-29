import React, { useState, useEffect } from 'react';
import { Box, List, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CreateCategoryModal from './CreateCategoryModal';
import Category from './Category';
import { getCategories } from '../api/request';

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Box>
      <Box>
        <h1>Category</h1>
        <h2>学習カテゴリ</h2>
      </Box>
      <Box sx={{
        borderRadius: 8,
        marginLeft: 65,
        marginRight: 65,
        marginTop: 3,
      }}>
        <IconButton onClick={() => { setIsShowCreateModal(true) }} >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          marginLeft: 65,
          marginRight: 65,
          marginTop: 3,
          paddingLeft: 4,
          paddingRight: 4,
        }}>
        {
          categories.map((category: any) => (
            <Category key={category.id} category={category} />
          ))
        }

      </List >
      {isShowCreateModal && (<CreateCategoryModal isShowCreateModal={isShowCreateModal} setIsShowCreateModal={setIsShowCreateModal} />)}
    </Box>
  );
}

export default CategoriesList;