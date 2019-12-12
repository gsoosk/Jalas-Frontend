import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { Fab, Typography } from '@material-ui/core';
import { savePoll } from './services/actions/savePollActions';
import PollItem from './components/PollItem/index';
import Axios from '../../services/axios';
import './styles.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';

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
            <div className="poll-header">
              <Typography variant="h3" align="center" gutterBottom>
                نظرسنجی‌های شما
              </Typography>
              <Link to="/createPoll">
                <Fab variant="extended" color="primary" className="add-poll-button">
                  <AddCircleOutlineIcon className="navbar-button-icon" />
                ایجاد
                </Fab>
              </Link>
            </div>
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
