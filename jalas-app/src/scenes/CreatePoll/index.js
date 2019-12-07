import React from 'react';
import { Container } from 'react-bootstrap';
import { Card, Typography, CardContent } from '@material-ui/core';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
                  ایجاد یک نظرسنجی جدید
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default CreatePoll;
