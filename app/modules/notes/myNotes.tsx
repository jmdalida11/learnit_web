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
  "#F4617C", // Mild Red
  "#FF9E80", // Mild Coral
  "#FFD06D", // Mild Gold
  "#FFCC80", // Mild Amber
  "#B0E7A3", // Mild Green
  "#C2F0CB", // Mild Mint
  "#81E1D7", // Mild Teal
  "#9AB2EA", // Mild Blue
  "#8A94E5", // Mild Indigo
  "#C3A8DF", // Mild Violet
  "#F8BBD0", // Mild Rose
  "#D1CFDB", // Mild Gray
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
      { threshold: 0.1, rootMargin: "200px" },
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
                  <div className="line-clamp-3">
                    {getPlainText(note.content.slice(0, 330))}
                  </div>
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
      <div ref={observerRef} className="w-full flex justify-center mt-8">
        {isFetchingNextPage ? (
          <span className="loading loading-dots loading-md"></span>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="btn btn-ghost btn-sm"
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-500">No more notes to show</p>
        )}
      </div>
      <CreateNoteDialog />
    </>
  );
};

export default MyNotes;
