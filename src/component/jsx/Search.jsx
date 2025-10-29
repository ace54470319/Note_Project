import { useState } from "react";
import "../css/Search.css";
import searchIcon from "../img/contents/search.png";

function Search() {
  var [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="Search_Box">
        <div className="Search_img_box">
          <img style={{ height: "60%" }} src={searchIcon} alt="" />
        </div>
        <input className="search_input" type="text" placeholder="search" />
      </div>
    </>
  );
}

export default Search;
