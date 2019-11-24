import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import MyAccountGuest from "../../components/myAccount/MyAccountGuest";
import MyAccountUser from "../../components/myAccount/myAccountUser/MyAccountUser";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  }

  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  render() {
    const { login } = this.state;

    if (login) {
      return <MyAccountUser />;
    } else {
      return <MyAccountGuest goToScreen={this.goToScreen} />;
    }
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
