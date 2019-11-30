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

function Index() {
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
                <Fab variant="extended" color="secondary" className="navbar-button">
                  <PollIcon className="navbar-button-icon" />
                  نظرسنجی‌ها
                </Fab>
                <Fab variant="extended" color="secondary" className="navbar-button">
                  <GroupWorkIcon className="navbar-button-icon" />
                  جلسات
                </Fab>
              </Col>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Index;
