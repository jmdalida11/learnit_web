import MyNotes from "~/modules/notes/myNotes";

export default function Home() {
  return (
    <div className="mt-5">
      <button className="btn">Add new note</button>
      <div className="mt-5">
        <MyNotes />
      </div>
    </div>
  );
}
