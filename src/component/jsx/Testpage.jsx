import { Link } from "react-router-dom";

function Testpage() {
  return (
    <div>
      <div>TestPage</div>
      <Link to={"/"}> Go To MainPage</Link>
    </div>
  );
}

export default Testpage;
