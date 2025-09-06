"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Table as TableIcon,
  Rows,
  Columns,
  Trash2,
  Merge,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BubbleMenu } from "@tiptap/react/menus";
import { useEffect, useState } from "react";

export default function BubbleMenuBar({ editor }: { editor: any }) {
  const [, setRender] = useState(0);

  // Re-render when editor updates (to refresh active states)
  useEffect(() => {
    if (!editor) return;
    editor.on("update", () => setRender((x) => x + 1));
    editor.on("selectionUpdate", () => setRender((x) => x + 1));
  }, [editor]);

  if (!editor) return null;

  const groups = [
    {
      name: "Headings",
      items: [
        {
          label: "Heading 1",
          icon: <Heading1 className="size-4" />,
          action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          active: () => editor.isActive("heading", { level: 1 }),
        },
        {
          label: "Heading 2",
          icon: <Heading2 className="size-4" />,
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          active: () => editor.isActive("heading", { level: 2 }),
        },
        {
          label: "Heading 3",
          icon: <Heading3 className="size-4" />,
          action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          active: () => editor.isActive("heading", { level: 3 }),
        },
      ],
    },
    {
      name: "Text Styles",
      items: [
        {
          label: "Bold",
          icon: <Bold className="size-4" />,
          action: () => editor.chain().focus().toggleBold().run(),
          active: () => editor.isActive("bold"),
        },
        {
          label: "Italic",
          icon: <Italic className="size-4" />,
          action: () => editor.chain().focus().toggleItalic().run(),
          active: () => editor.isActive("italic"),
        },
        {
          label: "Strikethrough",
          icon: <Strikethrough className="size-4" />,
          action: () => editor.chain().focus().toggleStrike().run(),
          active: () => editor.isActive("strike"),
        },
        {
          label: "Highlight",
          icon: <Highlighter className="size-4" />,
          action: () => editor.chain().focus().toggleHighlight().run(),
          active: () => editor.isActive("highlight"),
        },
      ],
    },
    {
      name: "Lists",
      items: [
        {
          label: "Bullet List",
          icon: <List className="size-4" />,
          action: () => editor.chain().focus().toggleBulletList().run(),
          active: () => editor.isActive("bulletList"),
        },
        {
          label: "Ordered List",
          icon: <ListOrdered className="size-4" />,
          action: () => editor.chain().focus().toggleOrderedList().run(),
          active: () => editor.isActive("orderedList"),
        },
        {
          label: "Blockquote",
          icon: <Quote className="size-4" />,
          action: () => editor.chain().focus().toggleBlockquote().run(),
          active: () => editor.isActive("blockquote"),
        },
        {
          label: "Code Block",
          icon: <Code className="size-4" />,
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          active: () => editor.isActive("codeBlock"),
        },
      ],
    },
    {
      name: "Alignment",
      items: [
        {
          label: "Align Left",
          icon: <AlignLeft className="size-4" />,
          action: () => editor.chain().focus().setTextAlign("left").run(),
          active: () => editor.isActive({ textAlign: "left" }),
        },
        {
          label: "Align Center",
          icon: <AlignCenter className="size-4" />,
          action: () => editor.chain().focus().setTextAlign("center").run(),
          active: () => editor.isActive({ textAlign: "center" }),
        },
        {
          label: "Align Right",
          icon: <AlignRight className="size-4" />,
          action: () => editor.chain().focus().setTextAlign("right").run(),
          active: () => editor.isActive({ textAlign: "right" }),
        },
      ],
    },
    {
      name: "Table",
      items: [
        {
          label: "Insert Table",
          icon: <TableIcon className="size-4" />,
          action: () =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run(),
          active: () => editor.isActive("table"),
        },
        {
          label: "Add Row Below",
          icon: <Rows className="size-4" />,
          action: () => editor.chain().focus().addRowAfter().run(),
          active: () => false,
        },
        {
          label: "Add Column",
          icon: <Columns className="size-4" />,
          action: () => editor.chain().focus().addColumnAfter().run(),
          active: () => false,
        },
        {
          label: "Delete Table",
          icon: <Trash2 className="size-4" />,
          action: () => editor.chain().focus().deleteTable().run(),
          active: () => false,
        },
        {
          label: "Merge Cells",
          icon: <Merge className="size-4" />,
          action: () => editor.chain().focus().mergeCells().run(),
          active: () => false,
        },
      ],
    },
  ];

  return (
  <BubbleMenu
    editor={editor}
    tippyOptions={{ duration: 150 }}
    // 💡 Make BubbleMenu responsive
    className="
      bg-theme primary-text shadow-lg border border-strong rounded-xl 
      p-1 flex gap-2 
      overflow-x-auto max-w-[90vw]    /* 👈 scroll horizontally on phone */
      sm:overflow-x-visible sm:flex-nowrap
    "
  >
    {groups.map((group, groupIndex) => (
      <div
        key={groupIndex}
        className="flex space-x-1 border-r border-strong pr-2 last:border-none last:pr-0"
      >
        {group.items.map((item, itemIndex) => (
          <Tooltip key={itemIndex}>
            <TooltipTrigger asChild>
              <Toggle
                pressed={item.active()}
                onPressedChange={() => item.action()}
                className={`
                  hover:btn-hover rounded-lg 
                  flex items-center justify-center 
                  w-8 h-8 sm:w-10 sm:h-10  /* 👈 smaller buttons on mobile */
                  ${item.active() ? "bg-theme text-white" : ""}
                `}
              >
                {/* 👇 smaller icon on mobile */}
                <div className="size-4 sm:size-5">{item.icon}</div>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    ))}
  </BubbleMenu>
);

}
