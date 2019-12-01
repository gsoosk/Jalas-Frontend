import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import './styles.scss';
import Times from './scenes/Times';


function CreateMeeting() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom>
          ایجاد یک جَلسه‌ی جدید
          </Typography>
          <Times />
          <div className="button-row">
          <Button variant="contained" color="primary">
            ایجاد
          </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreateMeeting;
