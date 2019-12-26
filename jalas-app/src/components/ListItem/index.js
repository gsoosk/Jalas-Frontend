import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from 'react-bootstrap/Container';
import './styles.scss';
import Row from 'react-bootstrap/Row';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


function ListItem({ itemName, voteNumber, linkPath }) {
  return (
    <Link to={linkPath} style={{ textDecoration: 'none' }}>
      <CardActionArea className="list-item-area">
        <Container>
          <Row
            className="list-item-container"
            style={{
              width: '100%', display: 'felx', alignItems: 'center', justifyContent: 'center',
            }}
          >

            <Typography variant="h6" align="center">
              {itemName}
            </Typography>


          </Row>
        </Container>
      </CardActionArea>
    </Link>
  );
}

export default ListItem;
