import React from 'react';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Button} from '@material-ui/core';
import '../styles.scss';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Axios from '../../../services/axios';
import { toast } from 'react-toastify';



class CommentReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'', 
    };
    this.submitReply = this.submitReply.bind(this);
  }


  submitReply(){
    const { text } = this.state;
    const comment_id = this.props.match.params.comment_id;
    const commentReply = {
      comment_id: comment_id,
      text: text,
    };
    Axios.post('polls/reply_comment' + comment_id.toString() , commentReply)
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
    const { comments } = this.state;
    const { text } = this.state;
    console.log(comments);
    return (
      <Container className="reply-container">
        <Row className="vote_container" style={{ width: '100%' }}>
          <TextField
            style={{ width: '100%', margin: '10px'}}
            value={text}
            multiline
            label="متن پاسخ"
            onChange={(newText) => { this.setState({ text: newText.target.value }); }}
          />
        </Row>
        <Row className="vote_container" style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: '30px' }}
            disabled={!text}
            onClick={()=>{this.submitReply()}}
          >
            ثبت پاسخ
          </Button>
        </Row>
      </Container>
    );
  }
}



export default CommentReply;
