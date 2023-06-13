import About from "./About";

// importing styles
import "./Dashboard.route.css";

//importing custom components
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
