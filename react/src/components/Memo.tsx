import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

import { putRecord } from "../api/request";

const Memo = (props) => {
  const [memo, setMemo] = useState(props.memo);

  const closeMemo = () => {
    props.setIsShowMemo(false);
  }

  const handleUpdateMemo = (recordId, memo) => {
    putRecord(recordId, { memo }).then(res => {
      console.log('Updated memo:', res.data);
    }).catch(err => console.error('Failed to update memo:', err));
  }
  if (props.IsShowMemo) {
    return (
      <div id="overlay" onClick={closeMemo}>
        <div id="memo" onClick={(e) => e.stopPropagation()} style={{ margin: 20 }}>
          <MDEditor
            value={memo}
            onChange={setMemo}
            height={600}
          />
          <div style={{ marginTop: 8 }}>
            <button className="memoButton" onClick={closeMemo}>close</button>
            <button className="memoButton" onClick={() => handleUpdateMemo(props.recordId, memo)}>save</button>
          </div>
        </div>
      </div >
    )
  }
};

export default Memo;