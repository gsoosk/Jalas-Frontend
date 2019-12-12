import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { Col, Container, Row } from 'react-bootstrap';
import { Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './styles.scss';
import PollTime from './PollTime';

function AddParticipants({
  name, handleName, email, handleEmail, onAdd, participants, deleteParticipants,
}) {
  return (
    <Container className="add-poll-container">
      <Row>
        <Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
          اضافه کردن افراد:
        </Col>
        <Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="نام"
            value={name}
            onChange={handleName}
            style={{ width: '100%', margin: '10px' }}
          />
        </Col>
        <Col md={4}>
          <TextField
            label="ایمیل"
            value={email}
            onChange={handleEmail}
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
        {participants.map((item, index) => (
          <PollTime
            start={item.name}
            end={item.email}
            firstTitle="نام "
            secondTitle="ایمیل"
            onDelete={() => { deleteParticipants(index); }}
          />
        ))}

      </Row>
    </Container>
  );
}

export default AddParticipants;
