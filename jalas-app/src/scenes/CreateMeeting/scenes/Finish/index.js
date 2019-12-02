import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Typography, CircularProgress } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import UpdateIcon from '@material-ui/icons/Update';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';


function Finish({ meeting, reserved }) {
  const getDate = time => time.substr(0, 10);
  const getHour = time => time.substr(11, 5);
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
       جلسه‌ی
        {` ${meeting.title}`}
      </Typography>
      <Row style={{
        minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Col md={5}>
          <Typography variant="body1" align="center" gutterBottom>
            <HistoryIcon />
          از
            {` ${getHour(meeting.start_date_time)} `}
          روز
            {` ${getDate(meeting.start_date_time)} `}
          </Typography>
        </Col>
        <Col md={5}>

          <Typography variant="body1" align="center" gutterBottom>
            <UpdateIcon />
          تا
            {` ${getHour(meeting.end_date_time)} `}
          روز
            {` ${getDate(meeting.end_date_time)} `}
          </Typography>
        </Col>
      </Row>
      <Row style={{
        minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Typography variant="body1" align="center" gutterBottom>
          <MeetingRoomIcon />
          این جلسه در اتاق
          {` ${meeting.room_id} `}
          برگزار خواهد شد.
        </Typography>
      </Row>
      {!reserved
        ? (
          <Row style={{
            minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Typography variant="body1" align="center" gutterBottom>
              <CircularProgress style={{margin:"10px"}}/>
          اتاق در حال رزرو شدن است.
            </Typography>
          </Row>
        ) : <div />}

    </Container>
  );
}

export default Finish;
