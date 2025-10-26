import { lazy, Suspense } from "react";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import type { Note } from "~/queries/notes/types";

const NoteEditor = lazy(
  () => import("~/components/richTextEditor/richTextEditor")
);

interface NoteProps {
  note?: Note;
}

const NoteComponent = ({ note }: NoteProps) => {
  return (
    <div>
      <Suspense fallback={<SkeletonLoader />}>
        {note ? <NoteEditor defaultValue={note.content} /> : "Note not found."}
      </Suspense>
    </div>
  );
};

export default NoteComponent;
