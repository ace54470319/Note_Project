import '../../css/BodyMain.css';
import BodyTitle from './BodyTitle';
import BodyWrite from './BodyWrite';

function BodyMain() {
  return (
    <>
      <div className="body_box" style={{ color: 'white' }}>
        <div style={{ color: 'white' }} className="Box">
          <BodyTitle></BodyTitle>
          <BodyWrite></BodyWrite>
        </div>
      </div>
    </>
  );
}

export default BodyMain;
