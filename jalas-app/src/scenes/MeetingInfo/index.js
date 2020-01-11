import React from 'react';
import Container from 'react-bootstrap/Container';
// import { savePoll } from './services/actions/savePollActions';
// import PollItem from './components/PollItem/index';
import { Col, Row } from 'react-bootstrap';
import HistoryIcon from '@material-ui/core/SvgIcon/SvgIcon';
import UpdateIcon from '@material-ui/icons/Update';
import { Button, Typography } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';

class MeetingInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      meeting: '',
      room: '',
    };
    this.cancelMeeting = this.cancelMeeting.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.meetingID;
    Axios.get(`/meetings/${id}`, { timeout: 6000 })
      .then((response) => {
        console.log(response.data);
        console.log('success\n');
        this.setState({ meeting: response.data, room: response.data.room });
      })
      .catch((error) => {
        toast.error(<div>{error.response.data.message}</div>);
        console.log(error);
        this.props.history.push('/');
      });
  }

  cancelMeeting() {
    const id = this.props.match.params.meetingID;
    Axios.post('meetings/cancel', { meeting_id: id, after_creation: true })
      .then((response) => {
        console.log(response.data);
        toast.success(<div>جلسه با موفقیت کنسل شد </div>);
        window.location.reload();
      })
      .catch((error) => {
        console.log(id);
        console.log(error);
        toast.error(<div>{error.response.data.message}</div>);
      });
  }

  render() {
    const {
      meeting,
      room,
    } = this.state;
    const getDate = time => (time ? time.substr(0, 10) : '');
    const getHour = time => (time ? time.substr(11, 5) : '');
    return (
      <Container>
        <Container>
          <CardContent>
            <Card>
              <Typography variant="h3" align="center" style={{ marginTop: 20 }} gutterBottom>
                                  جلسه‌ی
                {` ${meeting.title}`}
              </Typography>
              <Row style={{
                minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Col md={5}>
                  <Typography variant="body1" align="center" gutterBottom>
                    <HistoryIcon />
                    از
                    {` ${getHour(meeting.start_date_time)} `}
                    روز
                    {` ${getDate(meeting.start_date_time)} `}
                  </Typography>
                </Col>
                <Col md={5}>

                  <Typography variant="body1" align="center" gutterBottom>
                    <UpdateIcon />
                    تا
                    {` ${getHour(meeting.end_date_time)} `}
                    روز
                    {` ${getDate(meeting.end_date_time)} `}
                  </Typography>
                </Col>
              </Row>
              {
                !meeting.is_cancelled ? (
                  <div>
                    <Row style={{
                      minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}
                    >
                      <Typography variant="body1" align="center" gutterBottom>
                        <MeetingRoomIcon />
                          این جلسه در اتاق
                        {` ${room.room_name} `}
                          برگزار خواهد شد.
                      </Typography>
                    </Row>
                    {meeting !== '' && localStorage.getItem('email') === meeting.creator.email
                      ? (
                        <Row style={{
                          minHeight: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: '10px', marginBottom: '20px' }}
                            onClick={() => { this.cancelMeeting(); }}
                          >
                                  لغو جلسه
                          </Button>
                        </Row>
                      ) : <div />
                      }
                  </div>
                )
                  : (
                    <Row style={{
                      minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}
                    >
                      <Typography variant="body1" align="center" gutterBottom>
                        <MeetingRoomIcon />
                    این جلسه لغو شده است.
                      </Typography>
                    </Row>
                  )
              }


            </Card>
          </CardContent>
        </Container>
      </Container>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   savePolls: (poll) => { dispatch(savePoll(poll)); },
// });

export default (MeetingInfo);
