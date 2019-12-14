import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import JalasApp from './services/redux';
import theme from './assets/theme/MUITheme';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/Toast';
import Polls from './scenes/Polls';
import Navbar from './components/Navbar';
import './assets/fonts/generalStyles.css';
import CreateMeeting from './scenes/CreateMeeting';
import MeetingInfo from './scenes/MeetingInfo';
import CreatePoll from './scenes/CreatePoll';

const store = createStore(JalasApp, applyMiddleware(thunk));

function App() {
  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <div dir="rtl">
              <Navbar />
              <div className="main-page">
                <Toast />
                <Route path="/polls" exact component={Polls} />
                <Route path="/createMeeting/:pollID" component={CreateMeeting} />
                <Route path="/createPoll" component={CreatePoll} />
                <Route path="/meetings/:meetingID" component={MeetingInfo} />
              </div>
            </div>
          </MuiThemeProvider>
        </Provider>
      </Router>
    </MuiPickersUtilsProvider>

  );
}

export default App;
