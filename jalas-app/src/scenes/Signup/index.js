import React from 'react';
import { Container, Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Row from 'react-bootstrap/Row';
import {
  TextField, Typography, Checkbox,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: true,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const { email, password, isAdmin } = this.state;
    const signupData = {
      username: email,
      password,
      is_staff: isAdmin,
    };
    console.log(signupData)
    Axios.post('meetings/signup/', signupData)
      .then((response) => {
        toast.success(<div>ثبت‌نام با موفقیت انجام شد.</div>);
        this.props.history.push('/login');
      })
      .catch((error) => {
        if (error.response) {
          toast.error(<div>{JSON.stringify(error.response.data)}</div>);
        }
      });
  }

  render() {
    const {
      email, password, confirmPassword, isAdmin,
    } = this.state;
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
                      برای ایجاد یک حساب کاربری اطلاعات خود را وارد کنید.
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
                    <TextField
                      value={confirmPassword}
                      label="تکرار رمز عبور"
                      onChange={(event) => {
                        this.setState({ confirmPassword: event.target.value });
                      }}
                      style={{ margin: '10px', width: '250px' }}
                      type="password"
                    />
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Typography variant="body2" style={{ margin: '10px' }}>
                        <Checkbox
                          onChange={() => { this.setState({ isAdmin: !isAdmin }); }}
                          value={isAdmin}
                          checked={isAdmin}
                        />
                        می‌خواهم به عنوان ادمین فعالیت کنم.
                      </Typography>
                    </Col>
                  </Row>
                  <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ margin: '10px' }}
                      disabled={!(password === confirmPassword && email && password && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))}
                      onClick={this.submit}
                    >
                      ثبت‌نام
                    </Button>
                  </Row>
                  <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <Typography align="center" variant="caption">
                     پ.ن : ایمیل‌تون رو واقعی وارد کنید ;)
                    </Typography>
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


export default Signup;
