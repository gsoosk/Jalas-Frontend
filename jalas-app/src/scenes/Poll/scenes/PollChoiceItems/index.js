import React from 'react';
import {
  Card, Row, Col, Container,
} from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';

import ScheduleIcon from '@material-ui/icons/Schedule';


function PollChoiceItems({ choices, handleOptionChange, closed }) {
  const getDate = time => time.substr(0, 10);
  const getHour = time => time.substr(11, 5);
  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
          برای این جلسه گزینه‌های زمانی زیر موجود می‌باشند. لطفا برای هر گزینه زمانی نظر خود را وارد کنید.
      </Typography>

      <Row>
        <Col md={2} style={{ display: 'flex', alignItems: 'center' }} />

        <Col md={8}>
          {choices.map((item, index) => (
            <Card>
              <Card.Header>
                <Row>
                  <Col md={1}>
                    <ScheduleIcon style={{ marginLeft: '10px' }} />
                  </Col>
                  <Col>
                  از
                    {` ${getHour(item.start_time)} `}
                  روز
                    {` ${getDate(item.start_time)} `}
                  </Col>
                  <Col>
                  تا
                    {` ${getHour(item.end_time)} `}
                  روز
                    {` ${getDate(item.end_time)} `}
                  </Col>
                </Row>
              </Card.Header>
              <Card.Text>
                <RadioGroup aria-label="choice" onChange={(e) => { handleOptionChange(item.id, e.target.value); }} name="customized-radios">
                  <FormControlLabel value="agree" control={<StyledRadio />} label="موافق" disabled={closed} />
                  <FormControlLabel value="disagree" control={<StyledRadio />} label="مخالف" disabled={closed} />
                  <FormControlLabel value="agree_ifneeded" control={<StyledRadio />} label="در صورت لزوم موافق" disabled={closed} />
                </RadioGroup>
              </Card.Text>
            </Card>
          ))}

        </Col>

        <Col md={2} style={{ display: 'flex', alignItems: 'center' }} />

      </Row>
    </Container>
  );
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

export default PollChoiceItems;
