import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Row, Col, Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';

function Times() {
    return (
        <Container style={{marginTop:"30px"}}>
          <Typography variant="body2" align="center" color="textSecondary" style={{ paddingTop: '10px' }}>
          برای ایجاد جلسه‌ی جدید اطلاعات زیر را پر کنید!
          </Typography>
        <Row>
          <Col md={3} style={{display:"flex", alignItems:"center"}}>
            زمان‌های رای داده‌شده :
          </Col>
          <Col md={9}>
            <FormControl>
              <InputLabel >Age</InputLabel>
              <Select
                value="ss"
                onChange={()=>{}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
      </Container>
    )
}

export default Times;
