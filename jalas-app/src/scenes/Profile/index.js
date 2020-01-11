import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Fab, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';


function Profile() {
  return (
    <Container>
      <Card>
        <CardContent>
          <div className="poll-header">
            <Typography variant="h3" align="center" gutterBottom>
              صفحه‌ی پروفایل
            </Typography>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/notificationManagement">
              <Fab variant="extended" color="secondary" className="navbar-button" >
                <NotificationsIcon className="navbar-button-icon" />
              تنظیمات اطلاع رسانی‌ها
              </Fab>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;
