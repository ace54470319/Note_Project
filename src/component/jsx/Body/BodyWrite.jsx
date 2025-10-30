// src/component/jsx/BodyWrite.jsx
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import '../../css/BodyWrite.css';

function BodyWrite({ value = '', onChange, readOnly }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // #, ##, ### 지원
      }),
      Placeholder.configure({
        placeholder: '여기에 내용을 입력하세요…',
      }),
    ],
    content: value,
    editable: !readOnly,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-invert max-w-none outline-none p-4 min-h-[calc(90vh-80px)]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  // value prop이 바뀌면 에디터 내용 갱신
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;
  }, [editor]);

  return (
    <div
      className="Editor_body"
      style={{
        width: '100%',
        height: '90%',
        msOverflowStyle: 'none',
        color: '#eaeaea',
        overflowY: 'scroll',
        marginTop: '20px',
        outline: 'none',
        border: 'none',
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
}

export default BodyWrite;
