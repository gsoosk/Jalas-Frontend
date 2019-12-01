import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import './styles.scss';
import axios from 'axios';
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
    const pollName = props.match.params.pollName;
    this.state = {
      flow: 'times',
      // flow: 'rooms',
      poll: {},
      polls: p,
      rooms: {},
      room: {},
      title: pollName,
    };
    this.selectTime = this.selectTime.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
  }

  selectTime(index) {
    const { polls } = this.state;
    this.setState({
      poll: polls[index],
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
    this.setState({
      room: rooms[index],
      flow: 'loading',
    });
    this.createMeeting();
  }

  createMeeting() {
    const { poll, room, title } = this.state;

    const meeting = {
      title: title,
      start_time: poll.start_time,
      end_time: poll.end_time,
      room_id: room.room_name,
      // participation_id: ,
    };
  }

  render() {
    const { flow, polls, rooms } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
              ایجاد یک جَلسه‌ی جدید
              برای

            </Typography>
            {flow === 'times'
              ? (<Times polls={polls} click={this.selectTime} />)
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

export default CreateMeeting;
