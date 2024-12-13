import { useState } from "react";

export const useNotesTableUtils = () => {
  const [isOpenModalDeleteNote, setIsOpenModalDeleteNote] = useState(false);
  const [notesId, setNotesId] = useState<string | number>(0);

  return {
    state: {
      isOpenModalDeleteNote,
      notesId,
    },
    event: {
      setIsOpenModalDeleteNote,
      setNotesId,
    },
  };
};
