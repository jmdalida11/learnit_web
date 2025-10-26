import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  defaultValue: string;
}

const RichTextEditor = ({ defaultValue }: RichTextEditorProps) => {
  const [value, setValue] = useState(defaultValue);
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default RichTextEditor;
