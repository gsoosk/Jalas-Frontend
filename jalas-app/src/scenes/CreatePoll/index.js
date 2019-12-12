import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Card, Typography, CardContent, TextField, Button,
} from '@material-ui/core';
import './styles.scss';
import AddPollTime from './components/AddPollTime';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      start: new Date(),
      end: new Date(),
    };
    this.addTime = this.addTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
  }

  addTime() {
    const { end, start } = this.state;
    const newTime = {
      start_date_time: start,
      end_date_time: end,
    };
    this.setState(prev => ({
      times: prev.times.concat(newTime),
      start: new Date(),
      end: new Date(),
    }));
  }

  deleteTime(index) {
    this.setState((prev) => {
      const times = prev.times;
      times.splice(index, 1);
      return {
        times,
      };
    });
  }

  render() {
    const { times, start, end } = this.state;
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
                  <AddPollTime
                    times={times}
                    startDate={start}
                    endDate={end}
                    handleEnd={(newDate) => { this.setState({ end: newDate }); }}
                    handleStart={(newDate) => { this.setState({ start: newDate }); }}
                    onAdd={this.addTime}
                    deleteTime={this.deleteTime}
                  />
                </Row>
                <Row className="create_poll_form_container" style={{ width: '100%' }}>
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
