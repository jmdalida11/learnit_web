import MyNotes from "~/modules/notes/myNotes";
import useNoteStore from "~/store/useNoteStore";

export default function Home() {
  const { openCreateDialog } = useNoteStore();

  return (
    <div className="mt-5">
      <button className="btn hover:btn-active" onClick={openCreateDialog}>
        Add new note
      </button>
      <div className="mt-5">
        <MyNotes />
      </div>
    </div>
  );
}
