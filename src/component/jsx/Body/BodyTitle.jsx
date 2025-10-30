import '../../css/BodyTitle.css';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';

function BodyTitle({ value, onChange }) {
  return (
    <div className="Title_box">
      <input type="text" className="Title_Font" placeholder="제목" value={value} onChange={e => onChange?.(e.target.value)} />
    </div>
  );
}

export default BodyTitle;
