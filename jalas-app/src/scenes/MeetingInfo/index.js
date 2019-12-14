import React from 'react';
import Container from 'react-bootstrap/Container';
// import { savePoll } from './services/actions/savePollActions';
// import PollItem from './components/PollItem/index';
import { Col, Row } from 'react-bootstrap';
import HistoryIcon from '@material-ui/core/SvgIcon/SvgIcon';
import UpdateIcon from '@material-ui/icons/Update';
import { Typography } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Axios from '../../services/axios';

class MeetingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: [],
    };
  }

  componentWillMount() {
  //   const { savePolls } = this.props;
  //   const { meeting } = this.state;
    Axios.get('/meetings', { params: { meeting_id: 1 } })
      .then((response) => {
        console.log(response.data);
        this.setState({ meeting: response.data });
        // savePolls(response.data.polls);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // const getDate = time => time.substr(0, 10);
    // const getHour = time => time.substr(11, 5);
    const {
      meeting,
    } = this.state;
    return (
      <Container>
        <Container>
          <CardContent>
            <Card>
              <Typography variant="h3" align="center" style={{marginTop: 20,}} gutterBottom>
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
                    {/* {` ${getHour(meeting.start_date_time)} `} */}
                    {/*        روز */}
                    {/* {` ${getDate(meeting.start_date_time)} `} */}
                  </Typography>
                </Col>
                <Col md={5}>

                  <Typography variant="body1" align="center" gutterBottom>
                    <UpdateIcon />
                                          تا
                    {/* {` ${getHour(meeting.end_date_time)} `} */}
                    {/*        روز */}
                    {/* {` ${getDate(meeting.end_date_time)} `} */}
                  </Typography>
                </Col>
              </Row>
              <Row style={{
                minHeight: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Typography variant="body1" align="center" gutterBottom>
                  <MeetingRoomIcon />
                                      این جلسه در اتاق
                  {` ${meeting.room_id} `}
                                      برگزار خواهد شد.
                </Typography>
              </Row>


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
