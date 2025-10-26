import { NavLink } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryNotes } from "~/queries/notes/notes";

const MyNotes = () => {
  const { data: notes = [], isLoading } = useQueryNotes();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      {notes.map((note) => (
        <div className="card w-96 bg-primary card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">
              <NavLink to={`note/${note.id}`}>{note.title}</NavLink>
            </h2>
            <p>
              {note.content.length > 100
                ? `${note.content.slice(0, 100)}...`
                : note.content}
            </p>
            <div className="justify-end card-actions">
              <NavLink
                to={`note/${note.id}`}
                className="btn btn-link text-black"
              >
                View
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyNotes;
