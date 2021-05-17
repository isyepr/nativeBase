import React, { Component } from 'react';
import { Container, Title, Header, Content, List, Button, ListItem, Item, Input, Form, Label, Body, Right, Thumbnail, Text, Row, Grid } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
class Home extends Component {

  state = {
    total_expense: 0,
    expenses: [],
    nominal: 0,
    deskripsi: '',
    userId: '0'
  }

  componentDidMount = () => {
    this.getUserInfo()
  }

  simpan = () => {
    console.log('home ', this.props.token)
    axios.post('http://10.0.2.2:3000/api/expense/add', {
      amount: this.state.nominal,
      description: this.state.deskripsi
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": this.props.token,
      }
    })
      .then((response) => {
        // console.log(response);
        // this.setState({ total_expense: this.state.total_expense + this.state.nominal })
        this.getUserInfo()
        this.updateTotalExpense(Number(this.state.total_expense) + Number(this.state.nominal))
      }, (error) => {
        console.log('simpan error', error);
      });
  }

  getUserInfo = () => {
    console.log('user info token', this.props.token)
    axios.get('http://10.0.2.2:3000/api/user', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": this.props.token,
      }
    })
      .then((response) => {
        this.setState({ expenses: response.data.data[0].expenses })
        this.setState({ total_expense: response.data.data[0].total_expense })
        this.setState({ userId: response.data.data[0]._id })
        console.log('user info ', this.state);
      }, (error) => {
        console.log('user info error ', error);
      });
  }

  updateTotalExpense = (value) => {
    axios.put('http://10.0.2.2:3000/api/user/update/' + this.state.userId, {
      total_expense: value
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": this.props.token,
      }
    })
      .then((response) => {
        console.log('update error', response);
        this.getUserInfo()
      }, (error) => {
        console.log('update error', error);
      });
  }

  handleNominalInput = (text) => {
    this.setState({ nominal: text })
  }

  handleDeskripsiInput = (text) => {
    this.setState({ deskripsi: text })
  }

  render() {
    return (
      <Container>
        <Grid>
          <Row>

            <Content style={{ padding: 10 }}>
              <Title style={{ color: 'black', marginLeft: 10 }}>Rp. {this.state.total_expense}</Title>
              <Form>
                <Item floatingLabel>
                  <Label>Nominal</Label>
                  <Input onChangeText={this.handleNominalInput} />
                </Item>
                <Item floatingLabel>
                  <Label>Deskripsi</Label>
                  <Input onChangeText={this.handleDeskripsiInput} />
                </Item>
                <Button full style={{ marginTop: 16 }}
                  onPress={
                    () => this.simpan()
                  }>
                  <Text>Simpan</Text>
                </Button>
                <Button full style={{ marginTop: 16 }}
                  onPress={
                    () => this.getUserInfo()
                  }>
                  <Text>Refresh</Text>
                </Button>
              </Form>
            </Content>
          </Row>
          <Row>
            <ScrollView>
              <Container>
                <Content>
                  <List>
                    {
                      this.state.expenses.map((item, index) => (
                        <ListItem key={item._id}>
                          <Body>
                            <Text>{item.amount}</Text>
                            <Text note>{item.description}</Text>
                          </Body>
                          <Right>
                            <Text note>3:43 pm</Text>
                          </Right>
                        </ListItem>
                      ))
                    }
                  </List>
                </Content>
              </Container>
            </ScrollView>
          </Row>
        </Grid>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state
  return { token }
};

export default connect(mapStateToProps)(Home)