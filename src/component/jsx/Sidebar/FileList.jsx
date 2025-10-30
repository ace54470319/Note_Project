import { useState } from 'react';
import '../../css/FileList.css';
import filePlus from '../../img/contents/filePlus.png';
import folderPlus from '../../img/contents/folderPlus.png';

function FileList() {
  const [rootFiles, setRootFiles] = useState([]); // 폴더 밖(루트)의 파일들
  const [folders, setFolders] = useState([]); // 폴더 목록
  const [open, setOpen] = useState({}); // 폴더 펼침/접힘 상태

  const addFolder = () => {
    const name = prompt('새 폴더 이름을 입력하세요:');
    if (!name) return;
    const id = Date.now();
    setFolders((prev) => [...prev, { id, name, files: [] }]);
    setOpen((o) => ({ ...o, [id]: true })); // 기본 펼침
  };

  const addRootFile = () => {
    const name = prompt('새 파일 이름을 입력하세요 (루트):');
    if (!name) return;
    setRootFiles((prev) => [...prev, { id: Date.now(), name }]);
  };

  const addFileToFolder = (folderId) => {
    const name = prompt('새 파일 이름을 입력하세요 (폴더 내부):');
    if (!name) return;
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, files: [...f.files, { id: Date.now(), name }] } : f))
    );
  };

  const toggleFolder = (folderId) => {
    setOpen((o) => ({ ...o, [folderId]: !o[folderId] }));
  };

  return (
    <>
      {/* 상단 바 */}
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
          {/* 폴더 추가 */}
          <div className="plus_Folder_File" onClick={addFolder} title="폴더 추가">
            <img src={folderPlus} alt="" className="plus_Folder_File_img" />
          </div>
          {/* 루트에 파일 추가 */}
          <div className="plus_Folder_File" onClick={addRootFile} title="루트에 파일 추가">
            <img src={filePlus} alt="" className="plus_Folder_File_img" />
          </div>
        </div>
      </div>

      {/* 루트 파일 목록 */}
      {rootFiles.length > 0 && (
        <div className="file-list" style={{ width: '90%' }}>
          {rootFiles.map((file) => (
            <div key={file.id} className="file-item" style={{ marginLeft: '4px', color: '#ccc', padding: '4px 0' }}>
              📄 {file.name}
            </div>
          ))}
        </div>
      )}

      {/* 폴더 + 내부 파일 목록 */}
      <div className="folder-list" style={{ width: '90%' }}>
        {folders.map((folder) => (
          <div key={folder.id} className="folder-item" style={{}}>
            {/* 폴더 헤더 */}
            <div
              style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: open[folder.id] ? '#3e3e3e' : 'transparent',
              }}
              onClick={() => toggleFolder(folder.id)}
            >
              <span style={{ width: 16 }}>{open[folder.id] ? '▼' : '▶'}</span>
              <span>📁 {folder.name}</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                <div
                  className="plus_Folder_File"
                  onClick={(e) => {
                    e.stopPropagation(); // 토글과 충돌 방지
                    addFileToFolder(folder.id);
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
              </div>
            </div>

            {/* 폴더 내부 파일 */}
            {open[folder.id] && folder.files.length > 0 && (
              <div style={{ marginLeft: 24, marginTop: 6 }}>
                {folder.files.map((file) => (
                  <div key={file.id} style={{ color: '#aaa', padding: '4px 0' }}>
                    📄 {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default FileList;
