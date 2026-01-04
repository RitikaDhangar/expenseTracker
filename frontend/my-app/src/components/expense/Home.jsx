import { useSelector } from "react-redux";

const Home = () => {
  const userName = useSelector((state) => state.UserInfo.userName);
  return (
    <>
      <p>Hi {userName}</p>
    </>
  );
};
export default Home;
