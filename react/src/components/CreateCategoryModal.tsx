import React, { useState } from 'react';

import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";

import {
  postCategory,
  PostCategoryParams,
} from "../api/request";
import Overlay from './common/Overlay';

type CreateCategoryModalProps = {
  isShowCreateModal: boolean;
  setIsShowCreateModal: (isShowCreateModal: boolean) => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = (props) => {
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useColor("cyan");

  const closeCreateCategoryModal = () => {
    props.setIsShowCreateModal(false);
  }

  if (!props.isShowCreateModal) {
    return null;
  }

  const handleCreateCategory = async () => {
    try {
      const params: PostCategoryParams = {
        name: categoryName,
        color: color.hex,
      };
      await postCategory(params);
    } catch (err: unknown) {
      console.error('Failed to create category:', err);
    }
    props.setIsShowCreateModal(false);
  }

  return (
    <Overlay onClick={closeCreateCategoryModal}>
      <div id="createFrom" onClick={(e) => e.stopPropagation()} style={{ margin: 20 }}>
        <h2>Create Category</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            type="text"
            id="category"
            label="カテゴリ"
            sx={{ margin: '5px', width: '40%' }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <ColorPicker color={color} onChange={setColor} />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleCreateCategory}           >
            続ける
          </Button>
        </form>
      </div>
    </Overlay>
  );
};

export default CreateCategoryModal;