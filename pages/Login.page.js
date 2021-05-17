import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Card} from 'native-base';
import { connect } from 'react-redux'
import { addToken } from '../redux/Action'


class Login extends Component {
    state = {
        email: '',
        password: '',
        token: ''
    }

    handleEmailInput = (text) => {
        this.setState({ email: text })
    }

    handlePasswordInput = (text) => {
        this.setState({ password: text })
    }


    login = () => {


        axios.post('http://10.0.2.2:3000/api/user/verify', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({ token: response.data.token })
                    this.props.addToken(response.data.token)
                    this.props.navigation.navigate('Home')
                } else {
                    alert("Username & Password Salah")
                }
                console.log(this.state)
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Container>
                
                <Content  style={{ marginTop: 150, marginLeft: 30, marginRight: 30 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'EvilIcons', marginBottom: 15}}>
                    Selamat Datang
                </Text>
                    <Card  style={{ paddingBottom: 40, paddingLeft: 30, paddingRight:50, borderRadius: 10, backgroundColor: "#f1f1f1" }}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input onChangeText={this.handleEmailInput} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input onChangeText={this.handlePasswordInput} />
                            </Item>
                        </Form>
                    </Card>
                <Button style={{backgroundColor: "#fdb827", alignSelf:'center', borderRadius: 5, marginTop: 10}}
                    onPress={
                        () => this.login()
                    }>
                    <Text>Login</Text>
                </Button>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { addToken })(Login)