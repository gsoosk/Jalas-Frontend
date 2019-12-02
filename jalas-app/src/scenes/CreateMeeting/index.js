import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import './styles.scss';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';
import Times from './scenes/Times';
import Rooms from './scenes/Rooms';
import Finish from './scenes/Finish';


const p = [
  {
    start_time: '2019-09-14T20:00:00',
    end_time: '2019-09-14T21:00:00',
    negative: ['a', 'b'],
    positive: ['x', 'y'],
  },
  {
    start_time: '2019-12-01T15:51:43',
    end_time: '2019-12-01T17:51:43',
    negative: ['a', 'b'],
    positive: ['x', 'y'],
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
      reserved: false,
    };
    this.selectTime = this.selectTime.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
  }


  getRooms() {
    const { time } = this.state;
    // this.setState({ flow: 'loading' });
    Axios.post('/meetings/available', {
      start_date_time: time.start_time.substr(0, 19),
      end_date_time: time.end_time.substr(0, 19),
    }, { timeout: 6000 })
      .then((response) => {
        const rooms = response.data.rooms;
        if (rooms.length === 0) {
          toast.error(<div>در این زمان اتاقی  وجود ندارد</div>);
        }
        this.setState({ rooms, flow: 'rooms' });
      })
      .catch((error) => {
        if (!error.response) {
          toast.error(<div>در حال حاضر سیستم رزرواسیون در دسترس نیست. لطفا دوباره تلاش کنید.</div>);
        } else {
          toast.error(<div>{error.response.data}</div>);
        }
        this.setState({ flow: 'times' });
      });
  }

  selectTime(index) {
    const { times } = this.state;
    const newTime = times[index];
    this.setState({
      time: newTime,
      flow: 'loading',
    }, () => { this.getRooms(); });
  }

  selectRoom(index) {
    const { rooms } = this.state;
    const room = rooms[index];
    this.setState({
      room,
      flow: 'loading',
    }, () => { this.createMeeting(); });
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
      start_date_time: time.start_time,
      end_date_time: time.end_time,
      room_id: room,
      participants_id: participantsId,
    };

    Axios.post('/meetings/', meeting, { timeout: 6000 })
      .then((response) => {
        this.setState({ flow: 'finish', reserved: true });
        toast.success(<div>رزرود</div>);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error(<div>در حال حاضر سیستم رزرواسیون در دسترس نیست. لطفا دوباره تلاش کنید.</div>);
        } else {
          console.log(error.response);
          toast.error(<div>{error.response.data}</div>);
        }
        this.setState({ flow: 'finish' });
      });
    this.setState({ meeting, flow: 'finish' });
  }

  render() {
    const {
      flow, times, rooms, title, meeting, reserved,
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
                    ? (<Finish meeting={meeting} reserved={reserved} />
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
