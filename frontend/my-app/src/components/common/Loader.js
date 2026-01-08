import Spinner from "react-bootstrap/Spinner";

const CustomLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="dark" />
    </div>
  );
};
export default CustomLoader;
