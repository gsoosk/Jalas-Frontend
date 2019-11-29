import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './styles.scss';
import PollIcon from '@material-ui/icons/Poll';

function Index() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Container>
            <Row>
              <Col md={1}>
                <h3 className="navbar-bartitle">
                  جَلس
                </h3>
              </Col>
              <Col md={11} className="navbar-bartitle">
                <Fab variant="extended" color="secondary">
                  <PollIcon />
                  نظرسنجی‌ها
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
