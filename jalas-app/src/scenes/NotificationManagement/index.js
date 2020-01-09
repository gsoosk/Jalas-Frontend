import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button, } from '@material-ui/core';
import './styles.scss';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';


class NotificationManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll_creator_vote_notifications:true,
            poll_contribution_invitation:true, 
            mention_notification:true,
            poll_close_notification:true, 
            meeting_set_creator_notification:true, 
            meeting_invitation:true,
            cancel_meeting_notification:true,
        };
        this.submit = this.submit.bind(this);
        // this.handleOptionChange = this.handleOptionChange.bind(this);
      }
    
      componentDidMount() {
        Axios.get('/meetings/notificationsInfo')
          .then((response) => {
            console.log(response);
            this.setState({
                poll_creator_vote_notifications : response.data.poll_creator_vote_notifications,
                poll_contribution_invitation : response.data.poll_contribution_invitation, 
                mention_notification : response.data.mention_notification,
                poll_close_notification : response.data.poll_close_notification, 
                meeting_set_creator_notification : response.data.meeting_set_creator_notification, 
                meeting_invitation : response.data.meeting_invitation,
                cancel_meeting_notification : response.data.cancel_meeting_notification,
            });
          })
          .catch((error) => {
            toast.error(<div>{error.response.data.message}</div>);
            this.props.history.push('/');
          });
      }
    
    //   handleOptionChange(choiceId, choiceValue) {
    //     const newVotes = this.state.votes;
    //     newVotes[choiceId] = choiceValue;
    //     this.setState({
    //       votes: newVotes,
    //     });
    //   }
    
      submit() {
        const { votes } = this.state;
        const vote = {
          pollID: this.props.match.params.pollID,
          votes,
        };
        console.log(vote);
        Axios.post('polls/vote', vote)
          .then((response) => {
            toast.success(<div>تنظیمات شما با موفقیت بروزرسانی شد.</div>);
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
        // const {
        // //   times, 
        //   title, 
        // } = this.state;
        // const pollID = this.props.match.params.pollID;
        return (
          <Container>
            <Card>
              <CardContent>
                <div className="poll-header">
                  <Typography variant="h3" align="center" gutterBottom>
                    پنل تنظیم اطلاع رسانی‌ها
                  </Typography>
                </div>
                {/* <PollChoiceItems choices={times} closed={closed} handleOptionChange={this.handleOptionChange} /> */}
                <Row className="vote_container" style={{ width: '100%' }}>
                {/* <TextField
                    value={voterName}
                    id="voter_name"
                    label="ایمیل رای دهنده"
                    className="vote_voter_name"
                    onChange={(newName) => { this.setState({ voterName: newName.target.value }); }}
                /> */}
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی به سازنده رای گیری برای ثبت یا بروزرسانی رای: 
                    <RadioGroup aria-label="choice" onChange={(e) => { this.setState({poll_creator_vote_notifications : e.value}); }} name="customized-radios">
                    <FormControlLabel value={true} checked={this.state.poll_creator_vote_notifications} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value={false} checked={!this.state.poll_creator_vote_notifications} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی به دعوت برای شرکت در رای گیری : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value={true} checked={this.state.poll_contribution_invitation} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value={false} checked={!this.state.poll_contribution_invitation} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی مربوط به mention در یک رای گیری : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value='true' checked={this.state.mention_notification} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value='false' checked={!this.state.mention_notification} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی مربوط به بسته شدن رای گیری : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value='true' checked={this.state.poll_close_notification} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value='false' checked={!this.state.poll_close_notification} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی به سازنده رای گیری برای ایجاد شدن جلسه یک رای گیری : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value='true' checked={this.state.meeting_set_creator_notification} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value='false' checked={!this.state.meeting_set_creator_notification} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی مربوط به دعوت برای شرکت در جلسه : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value='true' checked={this.state.meeting_invitation} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value='false' checked={!this.state.meeting_invitation} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
              <Row>
                { <CardContent>
                    اطلاع رسانی مربوط به کنسل شدن یک جلسه : 
                    <RadioGroup aria-label="choice" onChange={(e) => { console.log(e.target.value); }} name="customized-radios">
                    <FormControlLabel value='true' checked={this.state.cancel_meeting_notification} control={<StyledRadio />} label="ارسال شود" />
                    <FormControlLabel value='false' checked={!this.state.cancel_meeting_notification} control={<StyledRadio />} label="ارسال نشود" />
                    </RadioGroup>
                
                </CardContent> }
              </Row>
                <Row className="vote_container" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: '30px' }}
                    onClick={this.submit}
                  >
                        ثبت تنظیمات
                  </Button>
                </Row>
              </CardContent>
            </Card>
          </Container>
        );
      }
}

function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  
  const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });

export default NotificationManagement;
