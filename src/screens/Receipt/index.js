import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";

import OrderSummary from "./OrderSummary";
import themes from "../styles/theme.style";
import firebase from "../../database/firebase";
import BackButton from "../../components/BackButton/BackButton";

const db = firebase.database();
class Receipt extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Receipt",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      ),
    };
  };

  getTotal() {
    let total = 0;
    const { items } = this.props;
    for (let i = 0; i < items.length; i++) {
      total = total + items[i].cost;
    }
    return <Text style={styles.totText}>Total: ${total.toFixed(2)}</Text>;
  }

  getTotalVal() {
    let total = 0;
    const { items } = this.props;
    for (let i = 0; i < items.length; i++) {
      total = total + items[i].cost;
    }
    return total.toFixed(2);
  }

  getCurrentDate() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return date + "-" + month + "-" + year;
  }

  onPressButton(navigation) {
    navigation.navigate("Home");
  }

  render() {
    const { customer, items } = this.props;
    const user = firebase.auth().currentUser;
    const { uid } = user;
    db.ref(`orders/${uid}`)
      .push({
        total: `$${this.getTotalVal()}`,
        orderId: `${uid}-${new Date().getTime()}`,
        date: `${this.getCurrentDate()}`,
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((error) => {
        //error callback
        console.log("error ", error);
      });
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.onPressButton(this.props.navigation)}
          >
            <Text style={styles.btnText}>Got to home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headings}>
          <Text>Invoice for your purchase</Text>
        </View>
        <View style={styles.billings}>
          <Text style={styles.billtext}>Billing details</Text>
          <Text style={styles.text}>{customer.name}</Text>
          <Text style={styles.text}>{customer.phone}</Text>
          <Text style={styles.text}>{customer.email}</Text>
          <Text style={styles.text}>{customer.street}</Text>
        </View>
        <View style={styles.orderSumm}>
          <Text style={styles.billtext}>Order summary</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => <OrderSummary item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.5, backgroundColor: "#34495e90" }} />
            )}
          />
          {this.getTotal()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headings: {
    backgroundColor: "#34495e90",
    padding: 12,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  orderSumm: {
    flex: 1,
    margin: 10,
  },
  billtext: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: themes.BACKGROUND_COLOR,
    justifyContent: "center",
  },
  text: {
    margin: 5,
  },
  billings: {
    height: 130,
    margin: 10,
  },
  totText: {
    textAlign: "center",
    color: "red",
  },
  btnText: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 14,
  },
  btn: {
    borderRadius: 30,
    margin: 15,
    padding: 6,
    backgroundColor: "white",
  },
});

const mapStateToProps = (state) => ({
  customer: state.order.order.customer,
  items: state.order.order.items,
});

export default connect(mapStateToProps)(Receipt);
