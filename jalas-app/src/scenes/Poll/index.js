import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Axios from '../../services/axios';
import PollChoiceItems from './scenes/PollChoiceItems';
import './styles.scss';
import { toast } from 'react-toastify';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      title: '',
      votes: {},
      voterName: '',
    };
    this.submit = this.submit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    const pollID = this.props.match.params.pollID;
    Axios.get(`/polls/${pollID}`)
      .then((response) => {
        console.log(response);
        const initVotes = {};
        this.setState({
          times: response.data.choices,
          title: response.data.title,
          votes: initVotes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOptionChange(choiceId, choiceValue) {
    const newVotes = this.state.votes;
    newVotes[choiceId] = (choiceValue === 'agree');
    this.setState({
      votes: newVotes,
    });
  }

  submit() {
    const { voterName, votes } = this.state;
    const vote = {
      voterName,
      pollID: this.props.match.params.pollID,
      votes,
    };
    console.log(vote);
    Axios.post('polls/vote', vote)
      .then((response) => {
        toast.success(<div>رای شما با موفقیت ثبت شد.</div>);
        this.props.history.push('/polls');
      })
      .catch((error) => {
        if (error.response) {
          console.log('hhhhhh', error.response);
          toast.error(<div>{error.response.data.message}</div>);
        } else {
          toast.error(<div>خطایی رخ داده است.</div>);
        }
      });
  }


  render() {
    const {
      times, title, voterName,
    } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
                    شرکت در نظرسنجی جلسه برای
              {` ${title} `}
            </Typography>
            <PollChoiceItems choices={times} handleOptionChange={this.handleOptionChange} />
            <Row className="vote_container" style={{ width: '100%' }}>
              <TextField
                value={voterName}
                id="voter_name"
                label="ایمیل رای دهنده"
                className="vote_voter_name"
                onChange={(newName) => { this.setState({ voterName: newName.target.value }); }}
              />
            </Row>
            <Row className="vote_container" style={{ width: '100%' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '30px' }}
                disabled={!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(voterName) || !voterName}
                onClick={this.submit}
              >
                    ثبت رای
              </Button>
            </Row>

          </CardContent>
        </Card>
      </Container>
    );
  }
}


export default (Poll);
