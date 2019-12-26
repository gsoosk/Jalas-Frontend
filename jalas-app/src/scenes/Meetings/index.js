import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { Fab, Typography } from '@material-ui/core';
import ListItem from '../../components/ListItem/index';
import Axios from '../../services/axios';
import './styles.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';

class Meetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    };
  }

  componentDidMount() {
    Axios.get('/meetings/all')
      .then((response) => {
        this.setState({ meetings: response.data.meetings });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { meetings } = this.state;
    return (
      <Container>
        <Card>
          <CardContent>
            <div className="meeting-header">
              <Typography variant="h3" align="center" gutterBottom>
                                جلسات شما
              </Typography>
            </div>
            {meetings.map(item => (<ListItem itemName={item.title} linkPath={`meetings/${item.id.toString()}`} />))}
            <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
                            برای مشاهده جزئیات هر جلسه آن را انتخاب کنید.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default Meetings;
