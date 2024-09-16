"use client"
import { useContext } from "react";
import { LectureListContext } from "../components/LectureListContext";

export function useLectureList() {
  const context = useContext(LectureListContext);

  if (!context) {
    throw new Error("useLectureList must be used within a LectureListProvider");
  }

  return context;
}