import About from "./About";
import "./Dashboard.route.css";
import Header from "../../../components/Header/Header";

const Dashboard = ({data}) => {
  return (
    <div className="main-body">
      <Header />
      <About data={data} />
    </div>
  );
};

export default Dashboard;
