import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Fab } from '@material-ui/core';
import '../styles.scss';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import Axios from '../../../services/axios';
import ReplyIcon from '@material-ui/icons/Reply';


class CommentReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.submitReply = this.submitReply.bind(this);
  }


  submitReply() {
    const { text } = this.state;
    const commentReply = {
      comment_id: this.props.commentId,
      text,
    };
    Axios.post('polls/reply_comment', commentReply)
      .then((response) => {
        toast.success(<div>نظر شما با موفقیت ثبت شد.</div>);
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
    const { text } = this.state;
    return (
      <Row>
          <Col md={10}>
            <TextField
              style={{ width: '100%' }}
              value={text}
              variant="outlined"
              multiline
              label="متن پاسخ"
              onChange={(newText) => { this.setState({ text: newText.target.value }); }}
            />
          </Col>
          <Col md={2}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              size="small"
              onClick={this.submitReply}
            >
              ارسال پاسخ
              <ReplyIcon />
            </Fab>
          </Col>
      </Row>
    );
  }
}


export default CommentReply;
