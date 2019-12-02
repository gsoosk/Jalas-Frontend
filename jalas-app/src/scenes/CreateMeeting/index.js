import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import './styles.scss';
import { connect } from 'react-redux';
import Axios from '../../services/axios';
import Times from './scenes/Times';
import Rooms from './scenes/Rooms';
import Finish from './scenes/Finish';


const p = [
  {
    start_time: '2019-09-14T19:00:00.000Z',
    end_time: '2019-09-14T20:00:00.000Z',
    negative: ['a', 'b'],
    positive: ['x', 'y'],
  },
  {
    start_time: '2019-12-01T15:51:43.636Z',
    end_time: '2019-12-01T17:51:43.636Z',
    negative: ['a', 'b'],
    positive: ['x', 'y'],
  },
];

const r = {
  rooms: [
    201, 202, 203,
  ],
};
class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    const pollID = props.match.params.pollID;
    const poll = props.polls.find ? props.polls.find(o => o.id === parseInt(pollID)) : undefined;
    this.state = {
      flow: 'times',
      time: {},
      times: p,
      rooms: {},
      room: {},
      title: poll ? poll.title : 'جلسه',
      meeting: {},
      poll,
    };
    this.selectTime = this.selectTime.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
  }



  getRooms() {
    const { time } = this.state;
    console.log(time);
    Axios.get('/meetings/available', {
      data: {
        start_date_time: time.start_time.substr(0, 19),
        end_date_time: time.end_time.substr(0, 19),
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    setTimeout(() => { this.setState({ rooms: r.rooms, flow: 'rooms' }); }, 1000);
  }

  selectTime(index) {
    const { times } = this.state;
    const newTime = times[index];
    this.setState({
      time: newTime,
      flow: 'loading',
    }, () => {this.getRooms()});
  }

  selectRoom(index) {
    const { rooms } = this.state;
    const room = rooms[index];
    this.setState({
      room,
      flow: 'loading',
    }, () => {this.createMeeting()});
  }

  createMeeting() {
    const {
      poll, room, title, time,
    } = this.state;
    const negIds = poll.negative.map(o => o.id);
    const posIds = poll.positive.map(o => o.id);
    const participantsId = negIds.concat(posIds);

    const meeting = {
      title,
      start_time: time.start_time,
      end_time: time.end_time,
      room_id: room,
      participants_id: participantsId,
    };

    // req

    setTimeout(() => { this.setState({ meeting, flow: 'finish' }); }, 1000);
  }

  render() {
    const {
      flow, times, rooms, title, meeting,
    } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            {flow !== 'finish'
              ? (
                <Typography variant="h3" align="center" gutterBottom>
                ایجاد یک جَلسه‌ی جدید
                برای
                  {` ${title} `}
                </Typography>
              ) : (<div />) }
            {flow === 'times'
              ? (<Times polls={times} click={this.selectTime} />)
              : flow === 'loading' ? <LinearProgress color="secondary" />
                : flow === 'rooms' ? <Rooms rooms={rooms} click={this.selectRoom} />
                  : flow === 'finish'
                    ? (<Finish meeting={meeting} />
                    ) : (<div />)}
          </CardContent>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  polls: store.savePollReducer.polls,
});

export default connect(mapStateToProps, null)(CreateMeeting);
