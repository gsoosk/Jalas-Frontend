import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { Col, Container, Row } from 'react-bootstrap';

function AddPollTime({ selectedDate, handleDateChange }) {
  return (
    <Container>
      <Row>
        <Col md={2}/>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <DateTimePicker
            autoOk
            ampm={false}
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
            label="تاریخ شروع جلسه"
            style={{ width: '100%' }}
          />
        </Col>
        <Col md={4}>
          <DateTimePicker
            autoOk
            ampm={false}
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
            label="تاریخ پایان جلسه"
            style={{ width: '100%' }}
          />
        </Col>
        <Col md={2} />
      </Row>
    </Container>
  );
}

export default AddPollTime;
