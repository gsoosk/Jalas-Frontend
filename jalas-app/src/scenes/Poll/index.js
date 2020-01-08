import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, Fab } from '@material-ui/core';
import './styles.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PollChoiceItems from './scenes/PollChoiceItems';
import Axios from '../../services/axios';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      title: '',
      votes: {},
      closed: true,
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
          closed: response.data.closed,
        });
      })
      .catch((error) => {
        toast.error(<div>{error.response.data.message}</div>);
        this.props.history.push('/');
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
    const { votes } = this.state;
    const vote = {
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
          toast.error(<div>{error.response.data.message}</div>);
        } else {
          toast.error(<div>خطایی رخ داده است.</div>);
        }
      });
  }


  render() {
    const {
      times, title, closed,
    } = this.state;
    const pollID = this.props.match.params.pollID;
    return (
      <Container>
        <Card>
          <CardContent>
            <div className="poll-header">
              <Typography variant="h3" align="center" gutterBottom>
                شرکت در نظرسنجی جلسه
                {` ${title} `}
              </Typography>
              <Link to={`/comments/` + pollID}>
                <Fab variant="extended" color="primary" className="comment-button">
                  <ChatBubbleOutlineIcon className="navbar-button-icon" />
                  نظرات
                </Fab>
              </Link>
            </div>
            <PollChoiceItems choices={times} closed={closed} handleOptionChange={this.handleOptionChange} />
            <Row className="vote_container" style={{ width: '100%' }}>
            {/* <TextField
                value={voterName}
                id="voter_name"
                label="ایمیل رای دهنده"
                className="vote_voter_name"
                onChange={(newName) => { this.setState({ voterName: newName.target.value }); }}
            /> */}
          </Row>
            <Row className="vote_container" style={{ width: '100%' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '30px' }}
                disabled={closed}
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
