import '../../css/BodyTitle.css';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';

function BodyTitle() {
  return (
    <div className="Title_box">
      <input type="text" className="Title_Font" placeholder="제목" />
    </div>
  );
}

export default BodyTitle;
