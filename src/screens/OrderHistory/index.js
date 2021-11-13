import React from "react";
import { ScrollView, Text, View } from "react-native";
import firebase from "../../database/firebase";

const db = firebase.database();

export default class OrderHistory extends React.Component {
  state = { orders: [] };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Order History",
    };
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const { uid } = user;
    db.ref("/orders").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      this.setState({ orders: data[uid] });
    });
  }
  renderOrders = () => {
    let orderKeys = Object.keys(this.state.orders);
    return (
      <View>
        {orderKeys.length > 0 ? (
          orderKeys.map((key) => (
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 4,
                margin: 3,
              }}
              key={key}
              id={key}
            >
              <Text style={{ marginBottom: 10 }}>
                Date: {this.state.orders[key].date}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Order ID: {this.state.orders[key].orderId}
              </Text>
              <Text>Total Amount: {this.state.orders[key].total}</Text>
            </View>
          ))
        ) : (
          <Text>No todo item</Text>
        )}
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return <ScrollView>{this.renderOrders()}</ScrollView>;
  }
}
