import React from 'react';
import { Container, Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Row from 'react-bootstrap/Row';
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const { email, password } = this.state;
    const loginData = {
      username: email,
      password,
    };
    Axios.post('meetings/auth/', loginData)
      .then((response) => {
        toast.success(<div>ورود با موفقیت انجام شد.</div>);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        this.setState({
          email: '',
          password: '',
        });
        this.props.history.push('/polls');
      })
      .catch((error) => {
        if(error.response.status === 400) {
          toast.error(<div>رمز عبور یا ایمیل اشتباه است. لطفا دوباره تلاش کنید.</div>);
        } else {
          toast.error(<div>{JSON.stringify(error.response.data)}</div>);
        }
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Row>
          <Col sm={0} md={2} />
          <Col sm={12} md={8}>
            <Card>
              <CardContent>
                <Container>
                  <Row style={{ width: '100%' }}>
                    <Typography variant="h5" align="center" style={{ width: '100%' }}>
                  برای ورود ایمیل و رمز عبور خود را وارد کنید
                    </Typography>
                  </Row>
                  <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <TextField
                      value={email}
                      label="ایمیل"
                      onChange={(event) => { this.setState({ email: event.target.value }); }}
                      style={{ margin: '10px', width: '250px' }}
                    />
                  </Row>
                  <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <TextField
                      value={password}
                      label="رمز عبور"
                      onChange={(event) => { this.setState({ password: event.target.value }); }}
                      style={{ margin: '10px', width: '250px' }}
                      type="password"
                    />
                  </Row>
                  <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ margin: '10px' }}
                      disabled={!(email && password && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))}
                      onClick={this.submit}
                    >
                     ورود
                    </Button>
                  </Row>
                </Container>
              </CardContent>
            </Card>
          </Col>
          <Col sm={0} md={2} />
        </Row>
      </Container>
    );
  }
}


export default Login;
