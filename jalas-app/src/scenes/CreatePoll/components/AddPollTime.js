import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { Col, Container, Row } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './styles.scss';
import PollTime from './PollTime';

function AddPollTime({
  startDate, handleStart, endDate, handleEnd, onAdd, times, deleteTime,
}) {
  return (
    <Container className="add-poll-container">
      <Row>
        <Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
          اضافه کردن زمان جدید:
        </Col>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <DateTimePicker
            autoOk
            ampm={false}
            disablePast
            value={startDate}
            onChange={handleStart}
            label="تاریخ شروع جلسه"
            style={{ width: '100%', margin: '10px' }}
          />
        </Col>
        <Col md={4}>
          <DateTimePicker
            autoOk
            ampm={false}
            disablePast
            value={endDate}
            onChange={handleEnd}
            label="تاریخ پایان جلسه"
            style={{ width: '100%', margin: '10px' }}
          />
        </Col>
        <Col md={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Fab color="primary" aria-label="add" size="medium" onClick={onAdd}>
            <AddIcon />
          </Fab>
        </Col>
      </Row>
      <Row>
        {times.map((item, index) => (
          <PollTime
            start={item.start_date_time}
            end={item.end_date_time}
            onDelete={() => { deleteTime(index); }}
          />
        ))}
      </Row>
    </Container>
  );
}

export default AddPollTime;
