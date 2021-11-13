import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import firebase from "../../database/firebase";

const db = firebase.database();

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

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

  renderOrders = (orderKeys) => {
    return (
      <View>
        {orderKeys?.length > 0 ? (
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
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Image
              source={require("../../../assets/icons/noOrders.png")}
              style={{ width: 400, height: 400 }}
            />
          </View>
        )}
      </View>
    );
  };

  render() {
    const { orders } = this.state;
    let orderKeys = orders ? Object.keys(orders) : [];
    return <ScrollView>{this.renderOrders(orderKeys)}</ScrollView>;
  }
}
