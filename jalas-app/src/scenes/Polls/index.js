import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { savePoll } from './services/actions/savePollActions';
import PollItem from './components/PollItem/index';
import Axios from '../../services/axios';

class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
    };
  }

  componentDidMount() {
    const { savePolls } = this.props;
    Axios.get('/polls', { params: { user: 1 } })
      .then((response) => {
        this.setState({ polls: response.data.polls });
        savePolls(response.data.polls);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { polls } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
          نظرسنجی‌های شما
            </Typography>
            {polls.map(item => (<PollItem pollName={item.title} linkPath={`createMeeting/${item.id.toString()}`} />))}
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
