import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Link to="/login"> Pradžia</Link>
    </div>
  );
};

export default HomeButton;
