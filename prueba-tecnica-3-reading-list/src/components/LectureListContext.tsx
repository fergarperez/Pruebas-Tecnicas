import { createContext, useState } from "react";
import { Book } from "../types";

interface Props {
  children: React.ReactNode;
}

interface LectureListContextType {
  list: Book[];
  addToList: (book: Book) => void;
  deleteBookFromList: (book: Book) => void;
}

export const LectureListContext = createContext<LectureListContextType | undefined>(undefined);

function LectureListProvider({children}: Props) {
  const [list, setList] = useState<Book[]>([])

  function addToList(book: Book) {
    const newList = structuredClone(list)

    newList.push(book)

    setList(newList)
  }

  function deleteBookFromList(book: Book) {
    const newList = list.filter(item => item.title !== book.title)

    setList(newList)
  }

  return (
    <LectureListContext.Provider value={{
      list,
      addToList,
      deleteBookFromList
    }}>
      {children}
    </LectureListContext.Provider>
  )
}

export default LectureListProvider