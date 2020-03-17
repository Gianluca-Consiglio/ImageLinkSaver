import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SingIn from './SingIn';
import SingUp from './SingUp';
import Home from './home';
import ImageListClass from './imagesListClass';

function App() {
  //App gestisce il routing delle pagine in base all'url corrente
  return(
    <div>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/imageList" component={ImageListClass} />
          <Route exact path="/singIn" component={SingIn} />
          <Route exact path="/singUp" component={SingUp} />
        </div>
      </Router>
    </div>
    
    
  )
  
}

export default App;
