import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {
  Card, Typography, CardContent, TextField, Button,
} from '@material-ui/core';
import './styles.scss';
import AddPollTime from './components/AddPollTime';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
                  ایجاد یک نظرسنجی جدید
            </Typography>
            <Container>
              <form autoComplete="off" noValidate>
                <Row>
                  <Col md={3} />
                  <Col md={6}>
                    <TextField id="poll_title" label="نام نظرسنجی" className="create_poll_title_name" />
                  </Col>
                  <Col md={3} />
                </Row>
                <Row>
                  <AddPollTime />
                </Row>
                <Row className="create_poll_form_container" style={{width:"100%"}}>
                  <Button variant="contained" color="secondary" style={{ margin: '10px' }}>
                    ثبت
                  </Button>
                </Row>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default CreatePoll;
