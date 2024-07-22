import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ mdValue, setMdValue }) => {
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