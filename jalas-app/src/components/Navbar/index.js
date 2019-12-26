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
                <Link to="/polls">
                  <Fab variant="extended" color="secondary" className="navbar-button">
                    <PollIcon className="navbar-button-icon" />
                    نظرسنجی‌ها
                  </Fab>
                </Link>
                <Fab variant="extended" color="secondary" className="navbar-button">
                  <GroupWorkIcon className="navbar-button-icon" />
                  جلسات
                </Fab>
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

              </Col>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Index;
