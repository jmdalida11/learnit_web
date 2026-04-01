import { Button } from "@headlessui/react";
import MyNotes from "~/modules/notes/myNotes";
import useNoteStore from "~/store/useNoteStore";

export default function Home() {
  const { openCreateDialog } = useNoteStore();

  return (
    <div>
      <Button
        className="btn hover:btn-active hover:bg-base-100"
        onClick={openCreateDialog}
      >
        Add New Note
      </Button>
      <div className="mt-5">
        <MyNotes />
      </div>
    </div>
  );
}
