import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SingIn from './SingIn';
import SingUp from './SingUp';

function App() {
  return(
    <Router>
      <div>
        <Route exact path="/singIn" component={SingIn} />
        <Route exact path="/singUp" component={SingUp} />
      </div>
    </Router>
    
  )
  
}

export default App;
