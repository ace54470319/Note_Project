import '../../css/BodyMain.css';
import BodyTitle from './BodyTitle';
import BodyWrite from './BodyWrite';

function BodyMain({ title = '', onTitleChange, value = '', onChange, readOnly }) {
  if (readOnly) {
    return (
      <div className="body_box" style={{ color: 'white', textAlign: 'center', paddingTop: 60 }}>
        <div style={{ color: '#aaa', fontSize: 18 }}>좌측에서 파일을 선택하세요</div>
      </div>
    );
  }
  return (
    <>
      <div className="body_box" style={{ color: 'white' }}>
        <div style={{ color: 'white' }} className="Box">
          <BodyTitle value={title} onChange={onTitleChange} />
          <BodyWrite value={value} onChange={onChange} readOnly={readOnly} />
        </div>
      </div>
    </>
  );
}

export default BodyMain;
