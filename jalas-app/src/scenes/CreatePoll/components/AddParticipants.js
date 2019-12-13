import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './styles.scss';
import PollTime from './PollTime';

function AddParticipants({
  email, handleEmail, onAdd, participants, deleteParticipants,
}) {
  return (
    <Container className="add-poll-container">
      <Row>
        <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
          اضافه کردن افراد:
        </Col>
        <Col md={4}>
          <TextField
            label="ایمیل"
            value={email}
            onChange={handleEmail}
            style={{ width: '100%', margin: '10px' }}
          />
        </Col>
        <Col md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            onClick={onAdd}
            disabled={!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) || !email}
          >
            <AddIcon />
          </Fab>
        </Col>
      </Row>
      <Row>
        {participants.map((item, index) => (
          <PollTime
            start={item.name}
            end={item.email}
            secondTitle="ایمیل :  "
            disableFirst
            onDelete={() => { deleteParticipants(index); }}
          />
        ))}

      </Row>
    </Container>
  );
}

export default AddParticipants;
