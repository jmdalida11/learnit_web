import { Suspense } from "react";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import type { Note } from "~/queries/notes/types";
import { useParams } from "react-router";
import { useQueryNote } from "~/queries/notes/notes";
import NoteComponent from "~/modules/notes/note";

const Note = () => {
  const params = useParams();
  const { data: note, isLoading } = useQueryNote({
    noteId: params["noteId"] as string,
  });

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader />
      ) : note ? (
        <Suspense fallback={<SkeletonLoader />}>
          <NoteComponent note={note} />
        </Suspense>
      ) : (
        "Note not found."
      )}
    </div>
  );
};

export default Note;
