import LogoutButton from './../components/LogoutButton';

const Dashboard = (props) => {
  const { setLoggedIn } = props;

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Dashboard</div>
      </div>
      <div>Welcome to your dashboard!</div>
      <div className="buttonContainer">
        <LogoutButton setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
};

export default Dashboard;