"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import React from "react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  locale?: string;
}

const AdvancedEditor: React.FC<Props> = ({ value, onChange, locale = "en" }) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none prose prose-sm dark:prose-invert",
        dir: locale === "ar" ? "rtl" : "ltr",
      },
    },
    autofocus: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  const addImage = () => {
    const url = prompt("أدخل رابط الصورة:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? active : button}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? active : button}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? active : button}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? active : button}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? active : button}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? active : button}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? active : button}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? active : button}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? active : button}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? active : button}
        >
          Right
        </button>
        <button onClick={addImage} className={button}>
          🖼️ Image
        </button>
        <button
          onClick={() => {
            const url = prompt("أدخل الرابط:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={button}
        >
          🔗 Link
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} className={button}>
          ↩️ Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className={button}>
          ↪️ Redo
        </button>
      </div>

      {/* Editor */}
      <div className="max-h-[300px] overflow-y-auto rounded-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default AdvancedEditor;

const button =
  "px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition";
const active =
  "px-2 py-1 text-sm rounded border border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-400 dark:bg-blue-700 dark:text-white";