import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from 'react-bootstrap/Container';
import './styles.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Typography } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';


function PollItem({pollName, voteNumber, linkPath}) {
  return (
    <Link to={linkPath} style={{textDecoration:"none"}}>
      <CardActionArea className="poll-item-area">
        <Container>
          <Row className="poll-item-container">
            <Col md={4}>
              <Typography variant="h6">
                {pollName}
              </Typography>

            </Col>
            <Col md={8} className="poll-item-votes">
              <Typography variant="body2" textAlign="left" style={{ direction: 'ltr !important', textAlign: 'left !important' }}>
                {voteNumber}
              </Typography>
              <EmojiPeopleIcon style={{marginLeft:"5px"}}/>
            </Col>
          </Row>
        </Container>
      </CardActionArea>
    </Link>
  );
}

export default PollItem;
