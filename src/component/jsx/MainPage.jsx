import { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import BodyMain from "./BodyMain";
import Header from "./Header";
import "../css/MainPage.css";

export default function App() {
  const [sidebarWidth, setSidebarWidth] = useState(270);
  const gridRef = useRef(null);
  const resizingRef = useRef(false);
  const [isResizing, setIsResizing] = useState(false);

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
        document.body.classList.remove("no-select");
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const startResize = () => {
    resizingRef.current = true;
    document.body.classList.add("no-select");
  };

  return (
    <div
      ref={gridRef}
      className="grid_box"
      style={{
        gridTemplateColumns: `${sidebarWidth}px 1fr`,
        transition: isResizing ? "none" : "grid-template-columns 1s ease",
      }}
    >
      {/* 1️⃣ 왼쪽 사이드바 */}
      <aside className="sidebar">
        <SideBar onToggle={toggleSidebar} isOpen={isOpen} />
        {!isOpen && <div className="resize_handle" onMouseDown={startResize} />}
      </aside>

      {/* 2️⃣ 상단 헤더 */}
      <header className="header">
        <Header />
      </header>

      {/* 3️⃣ 메인 본문 */}
      <main className="body">
        <BodyMain />
      </main>
    </div>
  );
}
