import MDEditor from "@uiw/react-md-editor";
import React from "react";

type MarkdownEditorProps = {
  mdValue: string;
  setMdValue: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ mdValue, setMdValue }) => {
  return (
    <div className="markdownEditor" style={{ margin: 20 }}>
      <MDEditor
        value={mdValue}
        onChange={setMdValue}
      />
    </div >
  )
}

export default MarkdownEditor;