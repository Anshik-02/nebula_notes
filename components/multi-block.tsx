"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { nanoid } from "nanoid";
import Tiptap1 from "./editor-1";
import debounce from "lodash.debounce";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Block {
  id: string;
  content: string;
  position?: number;
}

export default function MultiBlockEditor() {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const param = useParams() as { pageId: string };
  const isMounted = useRef(false);

  // Mobile-friendly sensors with activationConstraint + passive:false for touch
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
      eventListenerOptions: { passive: false },
    }),
    useSensor(PointerSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
    })
  );

  const autosave = useCallback(
    async (updatedBlocks: Block[]) => {
      try {
        const nonEmptyBlocks = updatedBlocks.filter(
          (block) => block.content.trim() !== ""
        );

        await axios.post("/api/blocks/create", {
          noteId: param.pageId,
          blocks: nonEmptyBlocks.map((block, index) => ({
            id: block.id,
            content: block.content,
            type: "text",
            position: index,
          })),
        });
      } catch (err) {
        console.error("autosave error", err);
      }
    },
    [param.pageId]
  );

  const debouncedSave = useMemo(
    () => debounce((b: Block[]) => autosave(b), 500),
    [autosave]
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  useEffect(() => {
    if (!param.pageId) return;
    isMounted.current = true;
    axios
      .get(`/api/blocks/get?noteId=${param.pageId}`)
      .then((res) => {
        const fetchedBlocks = res.data.blocks || [];
        const sanitized: Block[] = fetchedBlocks
          .map((block: any, idx: number) => ({
            id: block.id ?? nanoid(),
            content: typeof block.content === "string" ? block.content : "",
            position: typeof block.position === "number" ? block.position : idx,
          }))
          .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

        setBlocks(
          sanitized.length ? sanitized : [{ id: nanoid(), content: "" }]
        );
      })
      .catch((err) => {
        console.error("fetch blocks error", err);

        if (isMounted.current) setBlocks([{ id: nanoid(), content: "" }]);
      });

    return () => {
      isMounted.current = false;
    };
  }, [param.pageId]);

  const handleBackspace = useCallback(
    (index: number) => {
      setBlocks((prev) => {
        if (!prev) return prev;
        if (index === 0) return prev; // don’t delete the first block

        const updated = [...prev.slice(0, index), ...prev.slice(index + 1)];
        debouncedSave(updated);

        return updated;
      });
    },
    [debouncedSave]
  );

  const handleUpdate = useCallback(
    (id: string, newContent: string) => {
      setBlocks((prev) => {
        if (!prev) return prev;
        const updated = prev.map((block) =>
          block.id === id ? { ...block, content: newContent } : block
        );
        return updated;
      });

      // Use the latest blocks from state if available, fallback to computing
      debouncedSave(
        (prevBlocks => prevBlocks = (blocks ?? []).map((b) => (b.id === id ? { ...b, content: newContent } : b)))(blocks ?? [])
      );
    },
    [debouncedSave, blocks]
  );

  const handleEnter = useCallback(
    (index: number) => {
      setBlocks((prev) => {
        const newBlock: Block = { id: nanoid(), content: "" };
        const updated = prev
          ? [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)]
          : [newBlock];

        debouncedSave(updated);
        return updated;
      });
    },
    [debouncedSave]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!blocks) return;
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(blocks, oldIndex, newIndex);
      const withPositions = reordered.map((block, index) => ({
        ...block,
        position: index,
      }));

      setBlocks(withPositions);
      autosave(withPositions);
    },
    [blocks, autosave]
  );

  if (!blocks) {
    return <div className="min-h-[40px]" />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {blocks.map((block, index) => (
            <SortableBlock
              key={block.id}
              id={block.id}
              content={block.content}
              onUpdate={(newContent) => handleUpdate(block.id, newContent)}
              onEnter={() => handleEnter(index)}
              onBackspace={() => handleBackspace(index)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface SortableBlockProps {
  id: string;
  content: string;
  onUpdate: (content: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

function SortableBlock({
  id,
  content,
  onUpdate,
  onEnter,
  onBackspace,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="group rounded-md p-1">
      <div className="flex items-start gap-2">
        {/* Drag handle — increase tappable area, touch-action none, user-select none */}
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
          className="cursor-grab p-1 rounded-md text-gray-400 opacity-60 hover:opacity-100 active:cursor-grabbing"
          aria-label="Drag handle"
        >
          <GripVertical size={20} />
        </button>

        {/* Editor */}
        <div className="flex-1">
          <Tiptap1
            content={content}
            onUpdate={onUpdate}
            onEnter={onEnter}
            onBackspace={onBackspace}
          />
        </div>
      </div>
    </div>
  );
}
