import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";

const CustomLoader = () => {
  const { loader } = useSelector((store) => store.CustomInfo);

  if (!loader) {
    return;
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" variant="dark" />
    </div>
  );
};
export default CustomLoader;
