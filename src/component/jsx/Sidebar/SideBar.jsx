import '../../css/SideBar.css';
import Profile from './Profile';
import Search from './Search';
import FileList from './FileList';

function SideBar({ onToggle, isOpen, rootFiles, setRootFiles, folders, setFolders, selected, onSelect }) {
  return (
    <div className="Side_Box">
      <div className={`Title ${isOpen ? 'collapsed' : 'open'}`}>
        <div
          className="TitleText"
          style={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : '100%',
            transition: 'opacity .3s ease, width .3s ease',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          Page Note
        </div>

        <div
          className="ToggleBtn"
          style={{
            cursor: 'pointer',
            fontSize: '13px',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .5s ease, right .3s ease',
            flexShrink: 0,
            position: 'absolute',
            right: isOpen ? '-25px' : '15px',
          }}
          onClick={() => onToggle?.()}
          role="button"
          tabIndex={0}
        >
          ◀
        </div>
      </div>

      {!isOpen && (
        <>
          <Profile />
          <Search />
          <FileList
            rootFiles={rootFiles}
            setRootFiles={setRootFiles}
            folders={folders}
            setFolders={setFolders}
            selected={selected}
            onSelect={onSelect}
          />
        </>
      )}
    </div>
  );
}

export default SideBar;
