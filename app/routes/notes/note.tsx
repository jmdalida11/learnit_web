import { lazy } from "react";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import type { Note } from "~/queries/notes/types";
import { NavLink, useParams } from "react-router";
import { useQueryNote } from "~/queries/notes/notes";
import NoteComponent from "~/modules/notes/note";

const NoteEditor = lazy(
  () => import("~/components/richTextEditor/richTextEditor")
);

const Note = () => {
  let params = useParams();
  const { data: note, isLoading } = useQueryNote({
    noteId: params["noteId"] as string,
  });

  return (
    <div>
      <div className="mb-5">
        <NavLink to="/" className="btn btn-active">
          Back
        </NavLink>
      </div>
      {isLoading ? <SkeletonLoader /> : <NoteComponent note={note} />}
    </div>
  );
};

export default Note;
