import React, { useState, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";

import { putRecord } from "../api/request";

interface MemoProps {
  memo: string;
  recordId: number;
  setIsShowMemo: (isShowMemo: boolean) => void;
}

const Memo: React.FC<MemoProps> = ({ memo: initialMemo, recordId, setIsShowMemo }) => {
  const [memo, setMemo] = useState(initialMemo);

  const closeMemo = useCallback(() => {
    setIsShowMemo(false);
  }, [setIsShowMemo]);

  const handleUpdateMemo = useCallback(async () => {
    try {
      const response = await putRecord(recordId, { memo });
      console.log('Updated memo:', response.data);
      closeMemo();
    } catch (err) {
      console.error('Failed to update memo:', err);
    }
  }, [recordId, memo, closeMemo]);

  // onChangeイベントハンドラーをラップして型を合わせます
  const onChangeMemo = (value?: string) => {
    if (value !== undefined) {
      setMemo(value);
    }
  };

  return (
    <div className="overlay" onClick={closeMemo}>
      <div id="memo" onClick={(e) => e.stopPropagation()} style={{ margin: 20 }}>
        <MDEditor
          value={memo}
          onChange={onChangeMemo}
          height={600}
        />
        <div style={{ marginTop: 8 }}>
          <button className="memoButton" onClick={closeMemo}>close</button>
          <button className="memoButton" onClick={handleUpdateMemo}>save</button>
        </div>
      </div>
    </div>
  );
};

export default Memo;
