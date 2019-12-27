import React from 'react';
import './styles.scss';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Axios from '../../services/axios';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      comments: [],
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const pollID = this.props.match.params.pollID;
    Axios.get(`/polls/comments/${pollID}`)
      .then((response) => {
        console.log(response);
        this.setState({
          comments: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submit() {
    const { text } = this.state;
    const comment = {
      poll_id: this.props.match.params.pollID,
      text,
    };
    Axios.post('polls/comment', comment)
      .then((response) => {
        toast.success(<div>نظر شما با موفقیت ثبت شد.</div>);
        // this.props.history.push(`/comments/${comment.poll_id}`);
        this.setState({ text: '' });
        window.location.reload();
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
    const { comments } = this.state;
    const { text } = this.state;
    console.log(comments);
    return (
      <Container>
        <Card>
          <CardContent>
            <div className="meeting-header">
              <Typography variant="h3" align="center" gutterBottom>
                                نظرات ثبت‌شده
              </Typography>
            </div>
            <Row className="vote_container" style={{ width: '100%' }}>
              <TextField
                style={{ width: '60%' }}
                value={text}
                multiline
                label="متن نظر"
                rows="4"
                onChange={(newText) => { this.setState({ text: newText.target.value }); }}
                variant="filled"
              />
            </Row>
            <Row className="vote_container" style={{ width: '100%' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '30px' }}
                disabled={!text}
                onClick={this.submit}
              >
                ثبت نظر
              </Button>
            </Row>
            {comments.map(item => (
              <Container key={item.date_time}>
                <Row
                  className="list-item-container"
                >
                  <Col md={3}>
                    <Typography align="right">
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography color="primary" variant="h6">
                          <AccountCircleIcon fontSize="large" />
                          {` ${item.email}`}
                        </Typography>
                      </span>
                    </Typography>
                  </Col>
                  <Col md={9}>
                    <Typography color="secondary" variant="body1">
                      {item.text}
                    </Typography>
                  </Col>


                </Row>
              </Container>
            ))}
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default Comments;
