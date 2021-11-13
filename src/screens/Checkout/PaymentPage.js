import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
  btn: {
    borderRadius: 30,
    margin: 15,
    padding: 6,
    backgroundColor: "green",
  },
});

export default class PaymentPage extends Component {
  state = { cardData: {} };

  _onChange = (formData) => {
    const data = formData;
    this.setState({ cardData: data });
  };
  _onFocus = (field) => console.log("focusing", field);
  onPressButton = () => {
    const { navigation } = this.props;
    if (!this.state.cardData.valid) {
      alert("Enter valid card details");
    } else {
      navigation.navigate("Receipt");
    }
  };
  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    console.log("props==", this.props);
    return (
      <View style={s.container}>
        <LiteCreditCardInput
          autoFocus
          inputStyle={s.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={s.btn} onPress={this.onPressButton}>
            <Text style={s.btnText}>
              Make payment of ${state.params.cartTotal}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
