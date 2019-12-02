import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import UpdateIcon from '@material-ui/icons/Update';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

function Finish({ meeting }) {
  const getDate = (time) => {
    const date = new Date(time);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
  };
  const getHour = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
       جلسه‌ی
        {` ${meeting.title}`}
      </Typography>
      <Row style={{minHeight:'75px', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Col md={5}>
          <Typography variant="body1" align="center" gutterBottom>
            <HistoryIcon />
          از
            {` ${getHour(meeting.start_time)} `}
          روز
            {` ${getDate(meeting.start_time)} `}
          </Typography>
        </Col>
        <Col md={5}>

          <Typography variant="body1" align="center" gutterBottom>
            <UpdateIcon />
          تا
            {` ${getHour(meeting.end_time)} `}
          روز
            {` ${getDate(meeting.end_time)} `}
          </Typography>
        </Col>
      </Row>
      <Row style={{minHeight:'75px', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography variant="body1" align="center" gutterBottom>
          <MeetingRoomIcon />
          این جلسه در اتاق
          {` ${meeting.room_id} `}
          برگزار خواهد شد.
        </Typography>
      </Row>
    </Container>
  );
}

export default Finish;
