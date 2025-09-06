"use client";
import { useFolderStore, useNoteStore } from "@/hooks/use-note-store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditButton from "./edit-button";
import {
  ChevronDown,
  ChevronRight,
  FolderArchive,
  GripVertical,
  Star,
  Trash,
} from "lucide-react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DeleteModal from "../modal";

const ScrollAreaPages = () => {
  const param = useParams();
  const router = useRouter();

  const [folderName, setFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { notes, setNotes } = useNoteStore();
  const { folders, addFolder, setFolders } = useFolderStore();

  // one modal state for notes
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/api/pages`);
        setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, [setNotes]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get("/api/folders");
        setFolders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching folders:", err);
      }
    };
    fetchFolders();
  }, [setFolders]);

  useEffect(() => {
    if (!param?.pageId || !Array.isArray(notes) || !Array.isArray(folders))
      return;

    const activeNote = notes.find((n) => n.id === param.pageId);
    if (activeNote?.folderId) {
      const folderIdx = folders.findIndex((f) => f.id === activeNote.folderId);
      if (folderIdx !== -1) {
        setOpenIndex(folderIdx);
        setShowNotes(true);
      }
    }
  }, [param.pageId, notes, folders]);

  // --- CREATE FOLDER ---
  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      const res = await axios.post("/api/folders/create", { name: folderName });
      addFolder(res.data);
      setFolderName("");
      setShowInput(false);
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  // --- DELETE NOTE ---
  const handleDelete = async (pageId: string) => {
    try {
      await axios.patch(`/api/pages/delete?pageId=${pageId}`);

      if (param.pageId === pageId) {
        router.push("/dashboard");
      }

      setDeleteTargetId(null); // close modal

      setNotes(
        notes.map((n) => (n.id === pageId ? { ...n, isDeleted: true } : n))
      );
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  // --- FAVORITE NOTE ---
  const favoriteNote = async (pageId: string) => {
    try {
      const { data: updatedNote } = await axios.patch(
        `/api/pages/fav?pageId=${pageId}`
      );

      setNotes(
        notes.map((n) =>
          n.id === pageId ? { ...n, isStarred: updatedNote.isStarred } : n
        )
      );
    } catch (err) {
      console.error("Error favoriting", err);
    }
  };

  // --- DELETE FOLDER ---
  const handleDeleteFolder = async (folderId: string) => {
    try {
      await axios.delete(`/api/folders/delete`, { data: { folderId } });

      setFolders(folders.filter((f) => f.id !== folderId));

      setNotes(
        notes.map((n) =>
          n.folderId === folderId ? { ...n, folderId: null } : n
        )
      );
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  // --- DnD sensors (important for mobile) ---
  // Long-press activation helps prevent accidental drags while scrolling/typing
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
      // allow dnd-kit to preventDefault on touchstart
      eventListenerOptions: { passive: false as AddEventListenerOptions["passive"] },
    }),
    useSensor(PointerSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
    })
  );

  // --- DRAGGABLE NOTE ---
  const DraggableNote = ({ note }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: note.id,
      });

    const style = transform
      ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
      : undefined;

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex items-center gap-2 mx-4 my-1 px-2 py-1 text-sm rounded-sm",
          "hover:tag-hover secondary-text",
          {
            "bg-theme2 text-white": note.id === param.pageId,
            "opacity-50": isDragging,
          }
        )}
      >
        {/* Drag handle — big tappable area, touch-action none so touch doesn't scroll */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          // inline style ensures the browser won't interpret this touch as scrolling
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="cursor-grab active:cursor-grabbing text-zinc-500 p-2 rounded-md mr-1"
          aria-label="drag note"
        >
          <GripVertical size={16} />
        </button>

        {/* Clickable note content */}
        <div
          className="flex group justify-between w-full items-center truncate cursor-pointer"
          onClick={() => router.push(`/dashboard/${note.id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") router.push(`/dashboard/${note.id}`);
          }}
          role="button"
          tabIndex={0}
        >
          <span className="truncate">{note.name || "Untitled"}</span>

          <span className="flex gap-2 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                favoriteNote(note.id);
              }}
            >
              <Star
                className={cn(
                  "w-4 h-4 transition-all ease-in cursor-pointer",
                  note.isStarred
                    ? "text-yellow-300 hover:primary-text"
                    : "primary-text hover:!text-yellow-300 md:group-hover:block md:hidden"
                )}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTargetId(note.id); // track note to delete
              }}
            >
              <Trash className="w-4 h-4 transition-all ease-in md:group-hover:block md:hidden text-rose-500 cursor-pointer" />
            </button>
          </span>
        </div>
      </div>
    );
  };

  // --- DROPPABLE FOLDER ---
  const DroppableFolder = ({ folder, children, index }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: folder.id,
    });

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
      <div ref={setNodeRef}>
        <div
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          className={cn(
            "hover:tag-hover flex items-center justify-between px-5 py-1 mx-5 text-sm primary-text cursor-pointer rounded-sm",
            isOver && "bg-blue-300"
          )}
        >
          {/* Folder toggle */}
          <span className="flex items-center gap-1">
            {openIndex === index ? <ChevronDown /> : <ChevronRight />}
            {folder.name}
          </span>

          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteOpen(true);
            }}
          >
            <Trash className="w-4 h-4 text-rose-500 " />
          </button>
        </div>

        {/* Confirm delete modal for folder */}
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => handleDeleteFolder(folder.id)}
          message="Do you really want to delete this folder? Notes will be unassigned."
        />

        {openIndex === index && <div className="ml-6">{children}</div>}
      </div>
    );
  };

  // --- HANDLE DRAG END ---
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const pageId = active.id;
      const folderId = over.id;

      setNotes(notes.map((n) => (n.id === pageId ? { ...n, folderId } : n)));

      try {
        await axios.patch(`/api/pages?pageId=${pageId}`, { folderId });

        const folderIdx = folders.findIndex((f) => f.id === folderId);
        if (folderIdx !== -1) {
          setOpenIndex(folderIdx);
        }
      } catch (err) {
        console.error("Error updating note folder:", err);
      }
    }
  };

  return (
    <div>
      <ScrollArea>
        {/* Header */}
        <span
          onClick={() => setShowNotes(!showNotes)}
          className="py-3 px-3 items-center m-3 mx-5 primary-text text-sm flex justify-between mt-3 transition-all duration-200 ease-in-out hover:tag-hover rounded-sm"
        >
          Your Notes
          <span className="flex gap-1">
            <EditButton />
            <button onClick={() => setShowInput(true)}>
              <FolderArchive className="primary-text w-5 h-5" />
            </button>
            {!showNotes ? (
              <ChevronRight className="primary-text" />
            ) : (
              <ChevronDown className="primary-text" />
            )}
          </span>
        </span>

        {/* New Folder Input */}
        {showInput && (
          <input
            className="bg-transparent primary-text px-2 py-1 w-full"
            value={folderName}
            autoFocus
            onChange={(e) => setFolderName(e.target.value)}
            onBlur={handleCreateFolder}
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
          />
        )}

        {/* Folders + Notes */}
        {showNotes && (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {folders.map((folder, index) => (
              <DroppableFolder key={folder.id} folder={folder} index={index}>
                {Array.isArray(notes) &&
                  notes
                    .filter((n) => n.folderId === folder.id && !n.isDeleted)
                    .map((note) => <DraggableNote key={note.id} note={note} />)}
              </DroppableFolder>
            ))}

            {/* Unassigned Notes */}
            <div className="mt-2">
              {Array.isArray(notes) &&
                notes
                  .filter((n) => !n.folderId && !n.isDeleted)
                  .map((note) => <DraggableNote key={note.id} note={note} />)}
            </div>
          </DndContext>
        )}
      </ScrollArea>

      {/* Global delete modal for notes */}
      <DeleteModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => deleteTargetId && handleDelete(deleteTargetId)}
        message="Do you really want to delete this note?"
      />
    </div>
  );
};

export default ScrollAreaPages;
