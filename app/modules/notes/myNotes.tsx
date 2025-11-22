import { NavLink } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryNotes } from "~/queries/notes/notes";
import CreateNoteDialog from "./createNoteDialog";

const getPlainText = (html: string) => {
  return html
    .replace(/<p><br><\/p>/gi, "\n") // empty paragraph → newline
    .replace(/<\/p>/gi, "\n") // close paragraph → newline
    .replace(/<br\s*\/?>/gi, "\n") // <br> → newline
    .replace(/<[^>]+>/g, "") // strip all other HTML tags
    .trim();
};

const MyNotes = () => {
  const { data: notes = [], isLoading } = useQueryNotes();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
      {notes.map((note) => (
        <div
          key={note.id}
          className="card bg-primary shadow-sm hover:shadow-md transition-shadow duration-200 m-0"
        >
          <div className="card-body">
            <h2 className="card-title">
              <NavLink to={`note/${note.id}`}>{note.title}</NavLink>
            </h2>
            <pre className="whitespace-pre-wrap text-sm">
              {note.content.length > 100 ? (
                <>
                  <span>{getPlainText(note.content.slice(0, 330))}</span>
                  <NavLink
                    to={`note/${note.id}`}
                    className="text-accent-content"
                  >
                    ...continue reading
                  </NavLink>
                </>
              ) : (
                getPlainText(note.content)
              )}
            </pre>
          </div>
          <div className="justify-end card-actions">
            <NavLink to={`note/${note.id}`} className="btn btn-link text-black">
              View
            </NavLink>
          </div>
        </div>
      ))}
      <CreateNoteDialog />
    </div>
  );
};

export default MyNotes;
