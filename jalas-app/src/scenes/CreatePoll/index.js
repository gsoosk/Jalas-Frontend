import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Card, Typography, CardContent, TextField, Button,
} from '@material-ui/core';
import './styles.scss';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddPollTime from './components/AddPollTime';
import AddParticipants from './components/AddParticipants';
import Axios from '../../services/axios';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.initState = {
      times: [],
      start: new Date(),
      end: new Date(),
      deadline: new Date(),
      participants: [],
      email: '',
      title: '',
      hasDeadline: false,
    };
    this.state = { ...this.initState, componentState: '' };
    this.addTime = this.addTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.deleteParticipant = this.deleteParticipant.bind(this);
    this.submit = this.submit.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.updatePoll = this.updatePoll.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.pollID) {
      this.setState({ componentState: 'update' });
      Axios.get(`polls/create/${match.params.pollID}`)
        .then((response) => {
          const poll = response.data;
          this.setState({
            times: poll.choices,
            title: poll.title,
            participants: poll.participants,
          });
        })
        .catch((error) => {
          if (error.response) {
            toast.error(<div>{JSON.stringify(error.response.data)}</div>);
          } else {
            toast.error(<div>خطایی رخ داده است.</div>);
          }
        });
    } else {
      this.setState({ componentState: 'create' });
    }
  }

  addTime() {
    const { end, start } = this.state;
    const newTime = {
      start_date_time: start,
      end_date_time: end,
    };
    this.setState(prev => ({
      times: prev.times.concat(newTime),
      start: new Date(),
      end: new Date(),
    }));
  }

  deleteTime(index) {
    this.setState((prev) => {
      const times = prev.times;
      times.splice(index, 1);
      return {
        times,
      };
    });
  }

  addParticipant() {
    const { email } = this.state;
    const newParticipant = email;
    this.setState(prev => ({
      participants: prev.participants.concat(newParticipant),
      email: '',
    }));
  }

  deleteParticipant(index) {
    this.setState((prev) => {
      const participants = prev.participants;
      participants.splice(index, 1);
      return {
        participants,
      };
    });
  }

  createPoll(poll) {
    Axios.post('polls/create/', poll)
      .then((response) => {
        console.log(response.data);
        this.setState(this.initState);
        toast.success(<div>نظرسنجی با موفقیت ایجاد شد.</div>);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          toast.error(<div>{JSON.stringify(error.response.data)}</div>);
        } else {
          toast.error(<div>خطایی رخ داده است.</div>);
        }
      });
  }

  updatePoll(poll) {
    const { match, history } = this.props;
    if (match.params.pollID) {
      Axios.put(`polls/create/${match.params.pollID}/`, poll)
        .then((response) => {
          console.log(response.data);
          toast.success(<div>نظرسنجی با موفقیت تفییر یافت.</div>);
          history.push('/polls');
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            toast.error(<div>{JSON.stringify(error.response.data)}</div>);
          } else {
            toast.error(<div>خطایی رخ داده است.</div>);
          }
        });
    }
  }

  submit() {
    const {
      title, times, participants, componentState, deadline, hasDeadline,
    } = this.state;
    const poll = {
      title,
      choices: times,
      participants,
      deadline,
      hasDeadline,
    };
    if (componentState === 'create') this.createPoll(poll);
    else this.updatePoll(poll);
  }

  render() {
    const {
      times, start, end, participants, email, title, componentState, deadline, hasDeadline,
    } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
              {componentState === 'create' ? 'ایجاد یک نظرسنجی جدید' : 'تغییر یک نظرسنجی'}
            </Typography>
            <Container>
              <form autoComplete="off" noValidate>
                <Row>
                  <Col md={3} />
                  <Col md={6}>
                    <TextField
                      value={title}
                      id="poll_title"
                      label="نام نظرسنجی"
                      className="create_poll_title_name"
                      onChange={(newTitle) => { this.setState({ title: newTitle.target.value }); }}
                    />
                  </Col>
                  <Col md={3} />
                </Row>
                <Row>
                  <AddPollTime
                    times={times}
                    startDate={start}
                    endDate={end}
                    handleEnd={(newDate) => { this.setState({ end: newDate }); }}
                    handleStart={(newDate) => { this.setState({ start: newDate }); }}
                    onAdd={this.addTime}
                    deleteTime={this.deleteTime}
                  />
                </Row>
                <Row>
                  <AddParticipants
                    participants={participants}
                    deleteParticipants={this.deleteParticipant}
                    email={email}
                    handleEmail={(newEmail) => { this.setState({ email: newEmail.target.value }); }}
                    onAdd={this.addParticipant}
                  />
                </Row>
                { componentState === 'create'
                  ? (
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox checked={hasDeadline} onChange={() => { this.setState({ hasDeadline: !hasDeadline }); }} value="antoine" />
                        }
                        label="می‌خواهم یک ددلاین ثبت کنم."
                      />
                      {
                      hasDeadline ? (
                        <Row>
                          <DateTimePicker
                            autoOk
                            ampm={false}
                            disablePast
                            value={deadline}
                            label="تاریخ بسته شدن"
                            style={{ width: '100%', margin: '10px' }}
                            onChange={(newDate) => { this.setState({ deadline: newDate }); }}
                          />
                        </Row>
                      ) : <Row />
                    }
                    </div>
                  ) : <Row />
                }

                <Row className="create_poll_form_container" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: '10px' }}
                    disabled={!title || times.length === 0}
                    onClick={this.submit}
                  >
                    ثبت
                  </Button>
                </Row>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default CreatePoll;
