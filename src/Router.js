import { BrowserRouter as Router, Route } from "react-router-dom";

<Router>
      <div className="App">
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/signin" component={Signin}></Route>
    </div>
    </Router>