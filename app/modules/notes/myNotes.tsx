import { NavLink } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryNotes } from "~/queries/notes/notes";

const MyNotes = () => {
  const { data: notes = [], isLoading } = useQueryNotes();

  const getPlainText = (html: string) => {
    return html
      .replace(/<p><br><\/p>/gi, "\n") // empty paragraph → newline
      .replace(/<\/p>/gi, "\n") // close paragraph → newline
      .replace(/<br\s*\/?>/gi, "\n") // <br> → newline
      .replace(/<[^>]+>/g, "") // strip all other HTML tags
      .trim();
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      {notes.map((note) => (
        <div className="card w-96 bg-primary card-xs shadow-sm" key={note.id}>
          <div className="card-body">
            <h2 className="card-title">
              <NavLink to={`note/${note.id}`}>{note.title}</NavLink>
            </h2>
            <pre className="whitespace-pre-wrap">
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
