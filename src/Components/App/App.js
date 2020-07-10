import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Solitaire from "../Solitare/Solitaire";
import Landing from "../Landing/Landing";

class App extends React.Component {




  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/Solitaire" component={Solitaire} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
