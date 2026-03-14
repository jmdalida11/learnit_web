import { NavLink } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryNotes } from "~/queries/notes/notes";
import CreateNoteDialog from "./createNoteDialog";
import { useEffect, useRef } from "react";

const getPlainText = (html: string) => {
  return html
    .replace(/<p><br><\/p>/gi, "\n") // empty paragraph → newline
    .replace(/<\/p>/gi, "\n") // close paragraph → newline
    .replace(/<br\s*\/?>/gi, "\n") // <br> → newline
    .replace(/<[^>]+>/g, "") // strip all other HTML tags
    .trim();
};

const notesColorPalette = [
  "#F4617C", // Mild Red (Warm)
  "#C3A8DF", // Mild Violet (Cool)
  "#D1CFDB", // Mild Gray (Neutral)
  "#9AB2EA", // Mild Blue (Cool)
  "#B0E7A3", // Mild Green (Fresh)
  "#FFD06D", // Mild Gold (Accent)
];

const MyNotes = () => {
  const observerRef = useRef(null);
  const { notes, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useQueryNotes();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, observerRef.current]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {notes.map((note, idx) => (
          <div
            key={note.id}
            className="card shadow-sm hover:shadow-md transition-shadow duration-200 m-0"
            style={{
              backgroundColor:
                notesColorPalette[idx % notesColorPalette.length],
            }}
          >
            <div className="card-body">
              <h2 className="card-title text-black">
                <NavLink to={`note/${note.id}`}>{note.title}</NavLink>
              </h2>
              <pre className="whitespace-pre-wrap text-sm text-black">
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
              <NavLink
                to={`note/${note.id}`}
                className="btn btn-link text-black"
              >
                View
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <div ref={observerRef} className="w-full flex justify-center mt-3">
        {isFetchingNextPage && "Loading more..."}
      </div>
      <CreateNoteDialog />
    </>
  );
};

export default MyNotes;
