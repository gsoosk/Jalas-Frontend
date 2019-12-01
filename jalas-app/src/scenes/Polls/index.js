import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import PollItem from './components/PollItem/index';

function Polls() {
  let x = 10;
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom >
          نظرسنجی‌های شما
          </Typography>
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱" linkPath={'createMeeting/' + x.toString()}/>
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱"/>
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱"/>
          <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
            برای ایجاد جلسه‌ی جدید یکی از نظرسنجی‌های بالا را انتخاب کنید. 
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Polls;
