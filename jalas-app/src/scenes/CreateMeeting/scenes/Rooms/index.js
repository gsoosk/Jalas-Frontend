import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import './styles.scss';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

function Rooms({ rooms, click }) {
  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
        تمایل دارید جلسه در کدام اتاق برگزار شود؟
      </Typography>
      <Row>
        <Col md={2} style={{ display: 'flex', alignItems: 'center' }} />

        <Col md={8}>
          {rooms.map((item, index) => (
            <CardActionArea component="span" onClick={() => (click ? click(index) : {})}>
              <Container>
                <Row className="room-slot">
                  <MeetingRoomIcon fontSize="large" />
                  اتاق
                  {` ${item} `}
                </Row>
              </Container>
            </CardActionArea>
          ))}


        </Col>

        <Col md={2} style={{ display: 'flex', alignItems: 'center' }} />

      </Row>
    </Container>
  );
}

export default Rooms;
