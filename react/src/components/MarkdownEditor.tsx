import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export const MarkdownEditor = ({ mdValue, setMdValue }) => {
  return (
    <div className="markdownEditor" style={{ margin: 20 }}>
      <MDEditor
        value={mdValue}
        onChange={setMdValue}
      />
      <MDEditor.Markdown source={mdValue} style={{ whiteSpace: 'pre-wrap' }} />
    </div >
  )
}