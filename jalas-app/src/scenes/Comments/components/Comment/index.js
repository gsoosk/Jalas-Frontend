import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { Fab, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../../styles.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import ReplyIcon from '@material-ui/icons/Reply';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Axios from '../../../../services/axios';
import CommentReply from '../CommentReply';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;
    this.state = {
      replies: [],
      replying: false,
      editing: false,
      text: comment.text,
    };
    this.getReplies = this.getReplies.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  componentDidMount() {
    this.getReplies();
  }


  getReplies() {
    const { comment } = this.props;

    comment.replies.forEach((id) => {
      Axios.get(`/polls/comment/${id}`)
        .then((response) => {
          console.log(response);
          this.setState(prev => ({
            replies: [...prev.replies, response.data],
          }));
        })
        .catch((error) => {
          console.log(error);
          error.response ? toast.error(<div>{error.response.data.toString()}</div>)
            : toast.error(<div>{error.toString()}</div>);
        });
    });
  }

  updateComment() {
    const { comment } = this.props;
    const { text } = this.state;
    Axios.put(`/polls/update_comment/${comment.id}/`, { text })
      .then((response) => {
        this.setState({ editing: false });
      })
      .catch((error) => {
        console.log(error);
        error.response ? toast.error(<div>{error.response.data.toString()}</div>)
          : toast.error(<div>{error.toString()}</div>);
      });
  }

  render() {
    const {
      replies, replying, editing, text,
    } = this.state;
    const { comment, index } = this.props;
    const getDate = time => time.substr(0, 10);
    const getHour = time => time.substr(11, 5);
    return (
      <div key={index}>
        <div className="comment-container">
          <Container>
            <Row>
              <Container>
                <Row>
                  <Col md={10}>
                    <Row>
                      <Col md={12}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography color="primary" variant="body1">
                            <AccountCircleIcon fontSize="large" />
                            {` ${comment.email} `}
                          </Typography>
                          <Typography color="primary" variant="subtitle2">
                            <FastRewindIcon fontSize="small" />
                            {` ${getDate(comment.date_time)}  ${getHour(comment.date_time)}  `}
                            <ScheduleIcon fontSize="small" />
                          </Typography>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1}>
                        {comment.can_edit ? !editing
                          ? (
                            <IconButton color="secondary" onClick={() => { this.setState({ editing: true }); }}>
                              <CreateIcon />
                            </IconButton>
                          )
                          : (
                            <IconButton color="primary" onClick={this.updateComment}>
                              <SendIcon />
                            </IconButton>
                          ) : <div />}
                      </Col>
                      <Col md={11}>
                        <div>
                          <Typography color="secondary" variant="body1">
                            {!editing ? text
                              : (
                                <TextField
                                  style={{ width: '100%', marginBottom: '10px' }}
                                  value={text}
                                  variant="outlined"
                                  multiline
                                  onChange={(newText) => { this.setState({ text: newText.target.value }); }}
                                />
                              )
                            }
                          </Typography>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2}>
                    {comment.can_delete ? (
                      <div style={{ margin: '5px' }}>
                        <Fab
                          variant="extended"
                          color="secondary"
                          aria-label="add"
                          size="small"
                          onClick={() => {
                            this.props.delete(comment.id);
                          }}
                        >
                          حذف
                          <DeleteIcon />
                        </Fab>
                      </div>
                    ) : <div /> }
                    <div style={{ margin: '5px' }}>
                      {!replying
                        ? (
                          <Fab
                            variant="extended"
                            color={replying ? 'primary' : 'secondary'}
                            aria-label="add"
                            size="small"
                            onClick={() => {
                              this.setState({ replying: true });
                            }}
                          >
                          پاسخ
                            <ReplyIcon />
                          </Fab>
                        )
                        : <div />
                      }
                    </div>
                  </Col>
                </Row>
                {replying ? <CommentReply commentId={comment.id} /> : <div /> }

              </Container>
            </Row>
          </Container>
        </div>
        <div style={{ marginRight: '20px' }}>
          {replies.map((item, index) => (
            <Comment
              comment={item}
              index={index}
              delete={this.props.delete}
            />
          ))}
        </div>

      </div>
    );
  }
}

export default Comment;
