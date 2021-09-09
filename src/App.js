import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Pages/Registration/Registration";
import Signin from "./components/Pages/Signin/Signin";
import ForgotPassword from "./components/Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Pages/ResetPassword/ResetPassword";
import { NotesContainer } from "./components/FundooKeepComponent/FundooKeep";
import AuthRouter from "./components/FundooKeepComponent/AuthRouter/AuthRouter";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Registration}></Route>
          <AuthRouter  path="/signin" component={Signin}></AuthRouter>
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPassword}
          ></Route>
          <Route path="/resetpassword" component={ResetPassword}></Route>
          <Route path="/fundooKeep" component={NotesContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
