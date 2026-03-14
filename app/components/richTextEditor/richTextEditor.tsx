import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps extends ReactQuill.ReactQuillProps {
  value: string;
  setValue: (v: string) => void;
}

const RichTextEditor = ({ value, setValue, ...props }: RichTextEditorProps) => {
  return <ReactQuill value={value} onChange={setValue} {...props} />;
};

export default RichTextEditor;
