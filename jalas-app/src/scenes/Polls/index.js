import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { savePoll } from './services/actions/savePollActions';
import PollItem from './components/PollItem/index';

const polls = [
  {
    id: 1,
    pollName: 'نظرسنجی شماره‌ی ۱',
  },
];

localStorage.setItem('polls', polls);

function Polls() {
  const x = 10;
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom>
          نظرسنجی‌های شما
          </Typography>
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱" linkPath={`createMeeting/${x.toString()}/` + 'name'} />
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱" />
          <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱" />
          <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
            برای ایجاد جلسه‌ی جدید یکی از نظرسنجی‌های بالا را انتخاب کنید.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  savePoll: (poll) => { dispatch(savePoll(poll)); },
});

export default connect(null, mapDispatchToProps)(Polls);
