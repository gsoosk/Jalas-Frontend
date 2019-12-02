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


// const p = [
//   {
//     start_time: '2019-09-14T20:00:00',
//     end_time: '2019-09-14T21:00:00',
//     negative_voters: ['a', 'b'],
//     positive_voters: ['x', 'y'],
//   },
//   {
//     start_time: '2019-12-01T15:51:43',
//     end_time: '2019-12-01T17:51:43',
//     negative_voters: ['a', 'b'],
//     positive_voters: ['x', 'y'],
//   },
// ];

class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    const pollID = props.match.params.pollID;
    const poll = props.polls.find ? props.polls.find(o => o.id === parseInt(pollID)) : undefined;
    this.state = {
      flow: 'times',
      time: {},
      times: [],
      rooms: {},
      room: {},
      title: poll ? poll.title : 'جلسه',
      meeting: {},
      poll,
      reserved: false,
      meeting_id: -1,
      canceling: false,
    };
    this.selectTime = this.selectTime.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
    this.cancelMeeting = this.cancelMeeting.bind(this);
  }

  componentDidMount() {
    const pollID = this.props.match.params.pollID;
    Axios.get(`/polls/${pollID}`)
      .then((response) => {
        console.log(response);
        this.setState({ times: response.data.choices });
      })
      .catch((error) => {
        console.log(error);
      });
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
          this.setState({ rooms, flow: 'times' });
        } else {
          this.setState({ rooms, flow: 'rooms' });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (!error.response || error.response.status === 423) {
          toast.error(<div>در حال حاضر سیستم رزرواسیون در دسترس نیست. لطفا دوباره تلاش کنید.</div>);
        } else {
          toast.error((<div>{error.response.data.message}</div>));
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
      poll, room, title, time, times,
    } = this.state;
    const p = new Set();
    times.forEach((item) => {
      item.negative_voters.forEach((n) => { p.add(n); });
      item.positive_voters.forEach((po) => { p.add(po); });
    });
    const pList = [...p];

    console.log('list', pList);
    const meeting = {
      title,
      start_date_time: time.start_time,
      end_date_time: time.end_time,
      room_id: room,
      participants_id: pList,
    };

    Axios.post('/meetings/', meeting)
      .then((response) => {
        console.log(response.data);
        this.setState({ flow: 'finish', reserved: response.data.reserved, meeting_id: response.data.id });
        if (response.data.reserved) toast.success(<div>اتاق با موفقیت رزرو شد.</div>);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error(<div>در حال حاضر سیستم رزرواسیون در دسترس نیست. لطفا دوباره تلاش کنید.</div>);
        } else {
          toast.error(<div>{error.response.data}</div>);
          this.setState({ flow: 'rooms' });
        }
        this.setState({ flow: 'finish' });
      });
    this.setState({ meeting, flow: 'finish-loading' });
  }

  cancelMeeting() {
    const { meeting_id } = this.state;
    Axios.post('/cancel/', { meeting_id })
      .then((response) => {
        console.log(response.data);
        this.setState({ flow: 'times' });
        toast.success(<div>جلسه با موفقیت کنسل شد </div>);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error(<div>در حال حاضر سیستم رزرواسیون در دسترس نیست. لطفا دوباره تلاش کنید.</div>);
        } else if (error.response.status === 408) {
          toast.error(<div>اتاق رزرو شده‌است و دیگر امکان لغو جلسه نیست.</div>);
          this.setState({ flow: 'finish', reserved: true });
        } else {
          toast.error(<div>{error.response.data}</div>);
        }
      });
  }

  render() {
    const {
      flow, times, rooms, title, meeting, reserved,
    } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            {flow !== 'finish' || flow !== 'finish-loading'
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
                  : flow === 'finish' || flow === 'finish-loading'
                    ? (<Finish meeting={meeting} reserved={reserved} loading={flow === 'finish-loading'} click={this.cancelMeeting} />) : (<div />)}
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
