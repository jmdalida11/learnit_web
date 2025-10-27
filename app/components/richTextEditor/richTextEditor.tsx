import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  setValue: (v: string) => void;
}

const RichTextEditor = ({ value, setValue }: RichTextEditorProps) => {
  return <ReactQuill value={value} onChange={setValue} />;
};

export default RichTextEditor;
