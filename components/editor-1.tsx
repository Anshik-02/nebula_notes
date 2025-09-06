"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import Code from "@tiptap/extension-code";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import CharacterCount from "@tiptap/extension-character-count";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Mention from "@tiptap/extension-mention";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight,all } from "lowlight";
import MenuBar from "./menu-bar";
const lowlight = createLowlight(all);

const CustomCodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (editor.isActive("codeBlock")) {
          editor.commands.insertContent("\n");
          return true;
        }
        return false;
      },
      "Mod-Enter": ({ editor }) => {
        if (editor.isActive("codeBlock")) {
          editor.commands.exitCode();
          return true;
        }
        return false;
      },
    };
  },
}).configure({ lowlight });

const Tiptap1 = ({ content, onUpdate, onEnter,onBackspace }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-3" } },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ HTMLAttributes: { class: "bg-yellow-200" } }),
      Placeholder.configure({ placeholder: "✍️ What's on your mind..." }),
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CustomCodeBlock,
      TaskList,
      TaskItem.configure({ nested: true }),
      Blockquote,
      HorizontalRule,
      Dropcursor,
      Gapcursor,
      CharacterCount.configure({ limit: 10000 }),
      Subscript,
      Superscript,
      Mention.configure({ HTMLAttributes: { class: "mention" } }),
    ],
    content, // ✅ only initial content (do not reset later)
    editorProps: {
     handleKeyDown(view, event) {
    // ✅ If we're in a code block, let the CustomCodeBlock shortcut handle Enter
    if (event.key === "Enter" && view.state.schema.nodes.codeBlock && view.state.selection.$from.parent.type.name === "codeBlock") {
      return false; // let Tiptap handle it
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onEnter?.();
      return true;
    }

    if (event.key === "Backspace" && editor.isEmpty) {
      event.preventDefault();
      onBackspace();
      return true;
    }

    return false; // let other keys work
  },
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none w-full max-w-full md:max-w-3xl mx-auto bg-transparent text-white leading-relaxed break-words whitespace-pre-wrap",
        style: "word-break: break-word; overflow-x: auto;",
      },
    },
    onUpdate({ editor }) {
      onUpdate?.(editor.getHTML());
    },
    immediatelyRender: false,
    autofocus: true,
  });

  // 🔴 Remove resetting on every update
  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(content);
  //   }
  // }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="w-full md:max-w-3xl mx-auto overflow-x-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap1;
