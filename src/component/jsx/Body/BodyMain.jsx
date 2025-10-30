import '../../css/BodyMain.css';
import BodyTitle from './BodyTitle';
import BodyWrite from './BodyWrite';

function BodyMain({ title = '', onTitleChange, value = '', onChange, readOnly, selected }) {
  if (readOnly) {
    return (
      <div className="body_box" style={{ color: 'white', textAlign: 'center', paddingTop: 60 }}>
        <div style={{ color: '#aaa', fontSize: 18 }}>좌측에서 파일을 선택하세요</div>
      </div>
    );
  }
  // 선택된 파일 식별자 key 생성
  const editorKey = selected ? (selected.scope === 'root' ? selected.fileId : `${selected.folderId}-${selected.fileId}`) : 'none';
  return (
    <>
      <div className="body_box" style={{ color: 'white' }}>
        <div style={{ color: 'white' }} className="Box">
          <BodyTitle value={title} onChange={onTitleChange} />
          <BodyWrite key={editorKey} value={value} onChange={onChange} readOnly={readOnly} />
        </div>
      </div>
    </>
  );
}

export default BodyMain;
