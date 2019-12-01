import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import './styles.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import Times from './scenes/Times';
import Rooms from './scenes/Rooms';


const p = [
  {
    start_time: '2019-12-01T15:51:43.636Z',
    end_time: '2019-12-01T17:51:43.636Z',
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

const r = [
  {
    room_name: 801,
  },
  {
    room_name: 802,
  },
];
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

  selectTime(index) {
    const { times } = this.state;
    this.setState({
      time: times[index],
      flow: 'loading',
    });
    this.getRooms();
  }

  getRooms() {
    // Axios.get( , {
    //
    //   crossdomain: true,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    setTimeout(() => { this.setState({ rooms: r, flow: 'rooms' }); }, 1000);
  }

  selectRoom(index) {
    const { rooms } = this.state;
    const room = rooms[index];
    this.setState({
      room,
      flow: 'loading',
    });
    this.createMeeting(index);
  }

  createMeeting(roomIndex) {
    const {
      poll, rooms, title, time,
    } = this.state;
    const negIds = poll.negative.map(o => o.id);
    const posIds = poll.positive.map(o => o.id);
    const participantsId = negIds.concat(posIds);

    const meeting = {
      title,
      start_time: time.start_time,
      end_time: time.end_time,
      room_id: rooms[roomIndex].room_name,
      participants_id: participantsId,
    };

    // req

    setTimeout(() => { this.setState({ meeting, flow:'finish' }); }, 1000);
  }

  render() {
    const {
      flow, times, rooms, title,
    } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            {flow !== 'finish' ?
              (<Typography variant="h3" align="center" gutterBottom>
                ایجاد یک جَلسه‌ی جدید
                برای
                {` ${title} `}
              </Typography>) : (<div />) }
            {flow === 'times'
              ? (<Times polls={times} click={this.selectTime} />)
              : flow === 'loading' ? <LinearProgress color="secondary" />
                : flow === 'rooms' ? <Rooms rooms={rooms} click={this.selectRoom} />
                  : (<div />)}
            <div className="button-row">
              {flow === 'finish'
                ? (
                  <Button variant="contained" color="primary">
                  ایجاد
                  </Button>
                ) : (<div />)}
            </div>
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
