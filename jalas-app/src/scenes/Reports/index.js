import React from 'react';
import {
  Card, CardContent, Typography,
} from '@material-ui/core';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from '../../services/axios';


class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: {},
    };
  }

  componentDidMount() {
    Axios.get('reports/')
      .then((response) => {
        console.log(response.data);
        this.setState({ reports: response.data });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          toast.error(<div>{JSON.stringify(error.response.data)}</div>);
        } else {
          toast.error(<div>خطایی رخ داده است.</div>);
        }
      });
  }

  render() {
    const { reports } = this.state;
    return (
      <div>
        <Container>
          <Card>
            <CardContent>
              <Typography variant="h3" align="center" gutterBottom>
                گزارش‌ها
              </Typography>
              {
                Object.keys(reports).map(key => (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    {key}
                    {' '}
:
                    {' '}
                    {reports[key]}
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Reports;
