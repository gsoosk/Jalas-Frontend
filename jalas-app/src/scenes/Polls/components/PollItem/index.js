import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from 'react-bootstrap/Container';
import './styles.scss';
import Row from 'react-bootstrap/Row';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


function PollItem({ pollName, voteNumber, linkPath }) {
  return (
    <Link to={linkPath} style={{ textDecoration: 'none' }}>
      <CardActionArea className="poll-item-area">
        <Container>
          <Row className="poll-item-container" style={{ width: '100%', display: 'felx', alignItems:'center', justifyContent:'center' }}>

            <Typography variant="h6" align="center">
              {pollName}
            </Typography>


          </Row>
        </Container>
      </CardActionArea>
    </Link>
  );
}

export default PollItem;
