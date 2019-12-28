import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../styles.scss';
import { Fab } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import './styles.scss';
import { Link } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PollIcon from '@material-ui/icons/Poll';

function PollItem({
  pollID, pollTiltle, isCreator, history,
}) {
  return (

    <div className="list-item-container poll-container">
      <Container style={{ padding: '0' }}>
        <Row>
          <Col md={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardActionArea className="poll-item" onClick={() => { history.push(`/polls/${pollID.toString()}`); }}>
              <PollIcon style={{ margin: '5px' }} fontSize="large" color="primary" />
              {pollTiltle}
            </CardActionArea>
          </Col>

          <Col md={4}>
            <span style={{ display: 'flex', flexDirection: 'rowReverse' }}>
              <Link to={`/comments/${pollID.toString()}`} className="poll-btn">
                <Fab variant="extended">
                  <ChatBubbleOutlineIcon style={{ margin: '2px' }} />
                نظرات
                </Fab>
              </Link>
              {
                isCreator ? (
                  <div>
                    <Link to={`/editPoll/${pollID.toString()}`} className="poll-btn">
                      <Fab variant="extended">
                        <EditIcon style={{ margin: '2px' }} />
                        ویرایش
                      </Fab>
                    </Link>
                    <Link to={`/createMeeting/${pollID.toString()}`} className="poll-btn">
                      <Fab variant="extended">
                        <CheckCircleIcon style={{ margin: '2px' }} />
                        ثبت جلسه
                      </Fab>
                    </Link>
                  </div>
                )
                  : <div />
              }
            </span>

          </Col>

        </Row>
      </Container>

    </div>
  );
}

export default PollItem;
