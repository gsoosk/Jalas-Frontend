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
import Poll from './scenes/Poll';
import Login from './scenes/Login';
import Reports from './scenes/Reports';
import Meetings from './scenes/Meetings';
import Comments from './scenes/Comments';

const store = createStore(JalasApp, applyMiddleware(thunk));

function App() {
  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <div dir="rtl">
              <Route path="/*" exact component={Navbar} />
              <div className="main-page">
                <Toast />
                <Route path="/polls" exact component={Polls} />
                <Route path="/meetings" exact component={Meetings} />
                <Route path="/createMeeting/:pollID" component={CreateMeeting} />
                <Route path="/createPoll" component={CreatePoll} />
                <Route path="/editPoll/:pollID" component={CreatePoll} />
                <Route path="/polls/:pollID" component={Poll} />
                <Route path="/meetings/:meetingID" component={MeetingInfo} />
                <Route path="/login" component={Login} />
                <Route path="/reports" component={Reports} />
                <Route path="/comments/:pollID" component={Comments} />
              </div>
            </div>
          </MuiThemeProvider>
        </Provider>
      </Router>
    </MuiPickersUtilsProvider>

  );
}

export default App;
