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
    title: 'نظرسنجی شماره‌ی ۱',
    negative: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    positive: [
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
  },
  {
    id: 2,
    title: 'نظرسنجی شماره‌ی 2',
    negative: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    positive: [
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
  },
  {
    id: 3,
    title: 'نظرسنجی شماره‌ی ۱',
    negative: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    positive: [
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
  },
];

localStorage.setItem('polls', polls);

class Polls extends React.Component {
  constructor(props) {
    super(props);
    const { savePolls } = props;
    savePolls(polls);
  }

  render() {
    const x = 1;
    savePoll(polls);
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
          نظرسنجی‌های شما
            </Typography>
            <PollItem voteNumber={24} pollName="نظرسنجی شماره‌ی ۱" linkPath={`createMeeting/${x.toString()}`} />
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
}

const mapDispatchToProps = dispatch => ({
  savePolls: (poll) => { dispatch(savePoll(poll)); },
});

export default connect(null, mapDispatchToProps)(Polls);
