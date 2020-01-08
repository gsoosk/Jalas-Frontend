import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import './styles.scss';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Check, Clear, DoneOutline } from '@material-ui/icons';


function Times({ polls, click }) {
  const getDate = time => time.substr(0, 10);
  const getHour = time => time.substr(11, 5);
  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
          رای‌ها به شکل زیر می‌باشند. یکی از آن‌ها را انتخاب کنید.
      </Typography>
      <Row>
        <Col md={2} style={{ display: 'flex', alignItems: 'center' }} />

        <Col md={8}>
          {polls.map((item, index) => (
            <CardActionArea component="span" onClick={() => (click ? click(index) : {})}>
              <Container>
                <Row className="time-slot">
                  <Col md={8}>
                    <Row>
                      <Col md={1}>
                        <ScheduleIcon style={{ marginLeft: '10px' }} />
                      </Col>
                      <Col md={11}>
                        از
                        {` ${getHour(item.start_time)} `}
                        روز
                        {` ${getDate(item.start_time)} `}
                        <br />
                        تا
                        {` ${getHour(item.end_time)} `}
                        روز
                        {` ${getDate(item.end_time)} `}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Check style={{ marginLeft: '10px' }} />
                      <span style={{ marginLeft: '2px' }}>
                        {item.positive_voters.length}
                      </span>
                       رای موافق
                    </Row>
                    <Row>
                      <Clear style={{ marginLeft: '10px' }} />
                      <span style={{ marginLeft: '2px' }}>
                        {item.negative_voters.length}
                      </span>
                      رای مخالف
                    </Row>
                    <Row>
                      <DoneOutline style={{ marginLeft: '10px' }} />
                      <span style={{ marginLeft: '2px' }}>
                        {item.agree_ifneeded_voters.length}
                      </span>
                      رای در صورت لزوم موافق
                    </Row>
                  </Col>
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

export default Times;
