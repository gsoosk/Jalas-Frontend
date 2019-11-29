import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core';
import JalasApp from './services/redux';
import theme from './assets/theme/MUITheme';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/Toast';
import Polls from './scenes/Polls';
import Navbar from './components/Navbar';


const store = createStore(JalasApp, applyMiddleware(thunk));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Toast />
            <Navbar />
            <Route path="/polls" exact component={Polls} />
          </div>
        </MuiThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
