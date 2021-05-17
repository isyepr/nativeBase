import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
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
                <Header />
                <Content>
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

                </Content>
                <Button full
                    onPress={
                        () => this.login()
                    }>
                    <Text>Login</Text>
                </Button>
            </Container>
        );
    }
}

export default connect(null, { addToken })(Login)