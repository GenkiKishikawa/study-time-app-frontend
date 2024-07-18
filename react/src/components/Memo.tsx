import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export const Memo = (props) => {
  const [memo, setMemo] = useState(props.memo);

  const closeMemo = () => {
    props.setIsShowMemo(false);
  }

  return (
    <div id="overlay">
      <div id="memo" className="markdownEditor" style={{ margin: 20 }}>
        <MDEditor
          value={memo}
          onChange={setMemo}
        />
        <MDEditor.Markdown source={memo} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
      <button onClick={closeMemo}>close</button>
    </div >
  )
};