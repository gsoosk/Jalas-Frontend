import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Fab, Typography } from '@material-ui/core';
import './styles.scss';
import RemoveIcon from '@material-ui/icons/Remove';

function PollTime({ start, end, onDelete }) {
  return (
    <Container className="poll-time-container">
      <Row>
        <Col md={2} />
        <Col md={4}>
        تاریخ شروع :
          <Typography variant="caption" style={{ margin: '5px' }}>
            {start.toLocaleString()}
          </Typography>

        </Col>
        <Col md={4}>
        تاریخ پایان :
          <Typography variant="caption" style={{ margin: '5px' }}>
            {end.toLocaleString()}
          </Typography>

        </Col>
        <Col md={2}>
          <Fab color="secondary" aria-label="add" size="small" onClick={onDelete}>
            <RemoveIcon />
          </Fab>
        </Col>
      </Row>
    </Container>
  );
}

export default PollTime;
