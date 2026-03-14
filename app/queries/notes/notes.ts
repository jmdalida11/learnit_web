import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { NoteQueryKey, type Note } from "./types";
import { getAllMyNotesRequest, getNoteByIdRequest } from "~/api/notes";

export const useQueryNotes = () => {
  const PAGE_SIZE = 12;

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [NoteQueryKey.Notes],
      queryFn: ({ pageParam }) => {
        return getAllMyNotesRequest(pageParam - 1, PAGE_SIZE);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.length * PAGE_SIZE;
        return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
      },
    });

  return {
    notes: (data?.pages.flatMap((p) => p.notes).flat() as Note[]) ?? [],
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export const useQueryNote = ({ noteId }: { noteId: string }) => {
  return useQuery<Note>({
    queryKey: [NoteQueryKey.Note, noteId],
    queryFn: () => {
      return getNoteByIdRequest(noteId);
    },
  });
};
