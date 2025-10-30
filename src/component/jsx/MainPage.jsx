import { useEffect, useRef, useState } from 'react';
import SideBar from './Sidebar/SideBar';
import BodyMain from './Body/BodyMain';
import Header from './Header/Header';
import '../css/MainPage.css';

export default function App() {
  const [sidebarWidth, setSidebarWidth] = useState(270);
  const gridRef = useRef(null);
  const resizingRef = useRef(false);
  const [isResizing, setIsResizing] = useState(false);

  const [rootFiles, setRootFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selected, setSelected] = useState(null);

  const getSelectedTitle = () => {
    if (!selected) return '';
    if (selected.scope === 'root') {
      return rootFiles.find((f) => f.id === selected.fileId)?.title ?? '';
    }
    const fd = folders.find((f) => f.id === selected.folderId);
    return fd?.files.find((fi) => fi.id === selected.fileId)?.title ?? '';
  };
  const getSelectedContent = () => {
    if (!selected) return '';
    if (selected.scope === 'root') {
      return rootFiles.find((f) => f.id === selected.fileId)?.content ?? '';
    }
    const fd = folders.find((f) => f.id === selected.folderId);
    return fd?.files.find((fi) => fi.id === selected.fileId)?.content ?? '';
  };
  const updateSelectedTitle = (nextTitle) => {
    if (!selected) return;
    if (selected.scope === 'root') {
      setRootFiles((prev) => prev.map((f) => (f.id === selected.fileId ? { ...f, title: nextTitle } : f)));
    } else {
      setFolders((prev) =>
        prev.map((fd) => {
          if (fd.id !== selected.folderId) return fd;
          return {
            ...fd,
            files: fd.files.map((fi) => (fi.id === selected.fileId ? { ...fi, title: nextTitle } : fi)),
          };
        })
      );
    }
  };
  const updateSelectedContent = (nextHTML) => {
    if (!selected) return;
    if (selected.scope === 'root') {
      setRootFiles((prev) => prev.map((f) => (f.id === selected.fileId ? { ...f, content: nextHTML } : f)));
    } else {
      setFolders((prev) =>
        prev.map((fd) => {
          if (fd.id !== selected.folderId) return fd;
          return {
            ...fd,
            files: fd.files.map((fi) => (fi.id === selected.fileId ? { ...fi, content: nextHTML } : fi)),
          };
        })
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    setSidebarWidth((prev) => (prev == 0 ? 270 : 0));
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!resizingRef.current || !gridRef.current) return;
      setIsResizing(true);
      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const next = Math.max(200, Math.min(600, x));
      setSidebarWidth(next);
    };
    const onMouseUp = () => {
      if (resizingRef.current) {
        resizingRef.current = false;
        setIsResizing(false);
        document.body.classList.remove('no-select');
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const startResize = () => {
    resizingRef.current = true;
    document.body.classList.add('no-select');
  };

  // ...생략 (useState, getSelectedContent, updateSelectedContent 그대로)

  return (
    <div
      ref={gridRef}
      className="grid_box"
      style={{
        gridTemplateColumns: `${sidebarWidth}px 1fr`,
        transition: isResizing ? 'none' : 'grid-template-columns 1s ease',
      }}
    >
      {/* 사이드바: 파일/폴더 상태와 선택 전달 */}
      <aside className="sidebar">
        <SideBar
          onToggle={toggleSidebar}
          isOpen={isOpen}
          rootFiles={rootFiles}
          setRootFiles={setRootFiles}
          folders={folders}
          setFolders={setFolders}
          selected={selected}
          onSelect={setSelected}
        />
        {!isOpen && <div className="resize_handle" onMouseDown={startResize} />}
      </aside>

      {/*  헤더 그대로 */}
      <header className="header">
        <Header />
      </header>

      {/* 본문: 선택된 파일의 content 바인딩 */}
      <main className="body">
        <BodyMain
          title={getSelectedTitle()}
          onTitleChange={updateSelectedTitle}
          value={getSelectedContent()}
          onChange={updateSelectedContent}
          readOnly={!selected}
        />
      </main>
    </div>
  );
}
