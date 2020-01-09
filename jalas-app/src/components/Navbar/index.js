import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './styles.scss';
import PollIcon from '@material-ui/icons/Poll';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReportIcon from '@material-ui/icons/Report';
import NotificationsIcon from '@material-ui/icons/Notifications';

function Index(props) {
  console.log(props);
  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <Container>
            <Row className="navbar-details-row">
              <Col md={2}>
                <h1 className="navbar-bartitle">
                  جَلس
                </h1>
              </Col>
              <Col md={10} className="navbar-bartitle">
                {
                  localStorage.getItem('token')
                    ? (
                      <Fab
                        variant="extended"
                        color="secondary"
                        className="navbar-button-exit"
                        onClick={() => {
                          localStorage.setItem('token', '');
                          localStorage.setItem('user_id', '');
                          localStorage.setItem('email', '');
                          props.history.push('/login');
                        }}
                      >
                        <ExitToAppIcon className="navbar-button-icon" />
                    خروج
                      </Fab>
                    ) : <div />
                }
                <Link to="/polls">
                  <Fab variant="extended" color="secondary" className="navbar-button">
                    <PollIcon className="navbar-button-icon" />
                    نظرسنجی‌ها
                  </Fab>
                </Link>
                <Link to="/meetings">
                  <Fab variant="extended" color="secondary" className="navbar-button">
                    <GroupWorkIcon className="navbar-button-icon" />
                    جلسات
                  </Fab>
                </Link>
                <Link to="/notificationManagement">
                  <Fab variant="extended" color="secondary" className="navbar-button">
                    <NotificationsIcon className="navbar-button-icon" />
                    تنظیم اطلاع رسانی‌ها
                  </Fab>
                </Link>
                {localStorage.getItem('email')
                  ? (
                    <Fab variant="extended" color="secondary" className="navbar-button">
                      <AccountCircleIcon className="navbar-button-icon" />
                      {localStorage.getItem('email')}
                    </Fab>
                  )
                  : (
                    <Link to="/login">
                      <Fab variant="extended" color="secondary" className="navbar-button">
                        <VpnKeyIcon className="navbar-button-icon" />
                      ورود
                      </Fab>
                    </Link>
                  )}
                {localStorage.getItem('is_admin') === 'true' && localStorage.getItem('email')
                  ? (
                    <Link to="/reports">
                      <Fab variant="extended" color="secondary" className="navbar-button">
                        <ReportIcon className="navbar-button-icon" />
                      گزارش‌ها
                      </Fab>
                    </Link>
                  )
                  : <div />
                }

              </Col>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Index;
