import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button } from "react-native-elements";
import t from "tcomb-form-native";
import { LoginStruct, LoginOptions } from "../../forms/Login";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";

const Form = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }

  login = () => {
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      this.setState({
        loginErrorMessage: "Los datos del formulario son erroneos"
      });
    } else {
      this.setState({ loginErrorMessage: "" });
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Login correcto", 2500, () => {
            this.props.navigation.goBack();
          });
          console.log("Login correcto");
        })
        .catch(error => {
          this.refs.toastLogin.show("Login incorrecto", 2500);
        });
    }
  };

  onChangeFormLogin = formValue => {
    this.setState({
      loginData: formValue
    });
  };

  render() {
    const {
      loginStruct,
      loginOptions,
      loginData,
      loginErrorMessage
    } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={loginData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Login"
            onPress={() => this.login()}
          />
          <Text style={styles.textRegister}>
            ¿Aun no tienes una cuenta?{" "}
            <Text
              style={styles.buttonRegister}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              Registrate
            </Text>
          </Text>
          <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
        </View>
        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={250}
          faceInDuration={1000}
          faceOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40
  },
  containerLogo: {
    alignItems: "center"
  },
  logo: {
    width: 300,
    height: 150
  },
  viewForm: {
    marginTop: 50
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  loginErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 20
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  buttonRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
