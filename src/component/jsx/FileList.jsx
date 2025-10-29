import "../css/FileList.css";
import filePlus from "../img/contents/filePlus.png";
import folderPlus from "../img/contents/folderPlus.png";

function FileList() {
  return (
    <>
      <div
        style={{
          color: "#808080",
          width: "90%",
          fontSize: "15px",
          marginTop: "30px",
          display: "flex",
          paddingBottom: "5px",
          borderBottom: "2px solid #2e2e2e",
        }}
      >
        개인 페이지
        <div
          style={{
            display: "flex",
            marginLeft: "auto",

            height: "100%",
            gap: "8px",
          }}
        >
          <div className="plus_Folder_File">
            <img src={folderPlus} alt="" className="plus_Folder_File_img" />
          </div>
          <div className="plus_Folder_File">
            <img src={filePlus} alt="" className="plus_Folder_File_img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FileList;
