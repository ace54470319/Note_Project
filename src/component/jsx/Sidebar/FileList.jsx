import { useState } from 'react';
import '../../css/FileList.css';
import filePlus from '../../img/contents/filePlus.png';
import folderPlus from '../../img/contents/folderPlus.png';
import folderOpen from '../../img/contents/folder_open.png';
import folderClose from '../../img/contents/folder_close.png';

// 폴더 및 내부 트리 재귀 렌더링 컴포넌트
function FolderTree({ folder, selected, onSelect, onAddFile, onAddFolder, open, setOpen }) {
  const isOpen = open[folder.id];
  const toggleOpen = () => setOpen((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));

  return (
    <div className="folder-item">
      {/* 폴더 헤더 */}
      <div
        style={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '3px',
          padding: '4px 6px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          background: isOpen ? '#2f2f2f' : 'transparent',
        }}
        onClick={toggleOpen}
      >
        <img
          src={isOpen ? folderOpen : folderClose}
          alt="folder-toggle"
          style={{ width: '16px', height: '16px', objectFit: 'contain', opacity: 0.8 }}
        />
        <span>{folder.name}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          {/* 폴더내 파일 추가 버튼 */}
          <div
            className="plus_Folder_File"
            onClick={(e) => {
              e.stopPropagation();
              onAddFile(folder);
            }}
            title="이 폴더에 파일 추가"
          >
            <img
              src={filePlus}
              alt=""
              className="plus_Folder_File_img"
              style={{ width: 18, height: 18, opacity: 0.4 }}
            />
          </div>
          {/* 폴더내 폴더 추가 버튼 */}
          <div
            className="plus_Folder_File"
            onClick={(e) => {
              e.stopPropagation();
              onAddFolder(folder);
            }}
            title="이 폴더에 폴더 추가"
          >
            <img src={folderPlus} alt="" className="plus_Folder_File_img" style={{ opacity: 0.4 }} />
          </div>
        </div>
      </div>
      {/* 내부 파일 리스트 */}
      {isOpen && folder.files && folder.files.length > 0 && (
        <div style={{ marginLeft: 24, marginTop: 6 }}>
          {folder.files.map((file) => (
            <div
              key={file.id}
              style={{
                color: '#aaa',
                padding: '4px 0',
                cursor: 'pointer',
                background:
                  selected?.scope === 'folder' && selected?.fileId === file.id && selected?.folderId === folder.id
                    ? '#232323'
                    : undefined,
              }}
              onClick={() => onSelect({ scope: 'folder', folderId: folder.id, fileId: file.id })}
            >
              · {file.name}
            </div>
          ))}
        </div>
      )}
      {/* 내부 폴더 재귀 렌더링 */}
      {isOpen && folder.folders && folder.folders.length > 0 && (
        <div className="subfolder-list" style={{ marginLeft: 24, marginTop: 6 }}>
          {folder.folders.map((sub) => (
            <FolderTree
              key={sub.id}
              folder={sub}
              selected={selected}
              onSelect={onSelect}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 폴더 내부 files/folders 배열이 비어 있을 수도 있음에 주의
function FileList({ rootFiles, setRootFiles, folders, setFolders, selected, onSelect }) {
  const [open, setOpen] = useState({}); // 폴더ID별 펼침관리

  // 기존 루트 파일 추가
  const addRootFile = () => {
    const name = prompt('새 파일 이름을 입력하세요 (루트):');
    if (!name) return;
    setRootFiles((prev) => [...prev, { id: Date.now(), name, title: '', content: '' }]);
  };

  // 루트에 폴더 추가
  const addFolderRoot = () => {
    const name = prompt('새 폴더 이름을 입력하세요:');
    if (!name) return;
    setFolders((prev) => [...prev, { id: Date.now(), name, files: [], folders: [] }]);
    setOpen((o) => ({ ...o, [Date.now()]: true }));
  };

  // 하위 폴더에 파일 추가(폴더트리에서 콜백)
  function addFileToFolder(parentFolder) {
    const name = prompt('새 파일 이름을 입력하세요 (폴더 내부):');
    if (!name) return;
    // 재귀적으로 폴더 찾고 파일 추가
    const addFileRec = (folders) =>
      folders.map((f) => {
        if (f.id === parentFolder.id) {
          return { ...f, files: [...(f.files || []), { id: Date.now(), name, title: '', content: '' }] };
        }
        return { ...f, folders: f.folders ? addFileRec(f.folders) : [], files: f.files };
      });
    setFolders((prev) => addFileRec(prev));
  }

  // 하위 폴더에 폴더 추가(폴더트리에서 콜백)
  function addFolderToFolder(parentFolder) {
    const name = prompt('새 폴더 이름을 입력하세요 (폴더 내부):');
    if (!name) return;
    const newFolder = { id: Date.now(), name, files: [], folders: [] };
    const addFolderRec = (folders) =>
      folders.map((f) => {
        if (f.id === parentFolder.id) {
          return { ...f, folders: [...(f.folders || []), newFolder] };
        }
        return { ...f, folders: f.folders ? addFolderRec(f.folders) : [], files: f.files };
      });
    setFolders((prev) => addFolderRec(prev));
    setOpen((o) => ({ ...o, [newFolder.id]: true }));
  }

  return (
    <>
      {/* 상단 바, 루트 영역 디자인 그대로 */}
      <div
        style={{
          color: '#808080',
          width: '90%',
          fontSize: '15px',
          marginTop: '30px',
          display: 'flex',
          paddingBottom: '5px',
          borderBottom: '2px solid #2e2e2e',
        }}
      >
        개인 페이지
        <div style={{ display: 'flex', marginLeft: 'auto', height: '100%', gap: '8px' }}>
          {/* 루트에 파일 추가 */}
          <div className="plus_Folder_File" onClick={addRootFile} title="루트에 파일 추가">
            <img src={filePlus} alt="" className="plus_Folder_File_img" />
          </div>
          {/* 폴더 추가 */}
          <div className="plus_Folder_File" onClick={addFolderRoot} title="폴더 추가">
            <img src={folderPlus} alt="" className="plus_Folder_File_img" />
          </div>
        </div>
      </div>
      <div style={{ height: '15px' }}> </div>
      {/* 루트 파일 */}
      {rootFiles.length > 0 && (
        <div className="file-list" style={{ width: '90%' }}>
          {rootFiles.map((file) => (
            <div
              key={file.id}
              className={`file-item${selected?.scope === 'root' && selected?.fileId === file.id ? ' selected' : ''}`}
              style={{
                marginLeft: '4px',
                color: '#ccc',
                borderRadius: '6px',
                padding: '4px 0',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                background: selected?.scope === 'root' && selected?.fileId === file.id ? '#1c1c1c' : undefined,
              }}
              onClick={() => onSelect && onSelect({ scope: 'root', fileId: file.id })}
            >
              · {file.name}
            </div>
          ))}
        </div>
      )}
      {/* 폴더/파일 목록(트리) */}
      <div className="folder-list" style={{ width: '90%' }}>
        {folders.map((folder) => (
          <FolderTree
            key={folder.id}
            folder={folder}
            selected={selected}
            onSelect={onSelect}
            onAddFile={addFileToFolder}
            onAddFolder={addFolderToFolder}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </>
  );
}

export default FileList;
