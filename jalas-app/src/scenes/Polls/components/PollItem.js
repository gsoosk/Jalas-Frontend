import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../styles.scss';
import { Button } from '@material-ui/core';

function PollItem({
  pollID, pollTiltle, isCreator, history,
}) {
  return (
    <Container className="polls-form-container">
      <Row>
        <Col md={3} style={{ display: 'flex', alignItems: 'center' }}>
          {pollTiltle}
        </Col>
        <Col md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
            variant="contained"
            color="secondary"
            style={{ margin: '10px' }}
            onClick={
                ()=>{history.push('/polls/' + pollID.toString())}
            }
            >
            رای دادن
            </Button>
        </Col>
        
        {isCreator ? (
            <Col md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
            variant="contained"
            color="secondary"
            style={{ margin: '10px' }}
            onClick={
                ()=>{history.push('/editPoll/'+ pollID.toString())}
            }
            >
            ویرایش
            </Button>
           
        </Col>
        ) : <div /> }

        {isCreator ? (
          <Col md={3}>
            <Button
            variant="contained"
            color="secondary"
            style={{ margin: '10px' }}
            onClick={
                ()=>{history.push('/createMeeting/'+ pollID.toString())}
            }
            >
            ثبت جلسه
            </Button>
          </Col>
        ) : <div /> }
      </Row>
    </Container>
  );
}

export default PollItem;
