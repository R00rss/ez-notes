import { format_date } from "@/functions/globals";
import { Note } from "@/types/note";

interface Props {
  Note: Note;
}

export default function NoteCard({ Note }: Props) {
  const { created_at } = Note;
  const { day, time } = format_date(created_at);
  return (
    <section className="text-sm 2xl:text-base font-normal flex-grow-[1] capitalize text-slate-600 flex justify-between items-center gap-2">
      <p className="">{Note.name}</p>
      <p>
        {time} {day}
      </p>
    </section>
  );
}
