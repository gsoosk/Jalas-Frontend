import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import { Typography } from '@material-ui/core';


function CListItem({ itemName, voteNumber, linkPath }) {
  return (
      <CardContent className="list-item-area">
        <Container>

          <Row
            className="list-item-container"
            style={{
              width: '100%', display: 'felx', alignItems: 'left', justifyContent: 'left',
            }}
          >
            <Col md={4}></Col>
            <Col md={8}>
              <Typography variant="h6" align="right">
                {itemName}
              </Typography>
            </Col>
          </Row>
        </Container>
      </CardContent>
  );
}

export default CListItem;
