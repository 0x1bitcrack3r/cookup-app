import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import firebase from "../../database/firebase";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default class DrawerContainer extends React.Component {
  signOut = () => {
    const { navigation } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Logout==", error);
        this.setState({ errorMessage: error.message });
      });
  };

  renderUser = () => {
    const user = firebase.auth().currentUser;
    return (
      <View style={{ marginBottom: 100 }}>
        <Text style={{ color: "black" }}>
          {user?.displayName?.toUpperCase()}
        </Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <>
        <View style={styles.content}>
          <View style={styles.container}>
            {this.renderUser()}
            <MenuButton
              title="HOME"
              source={require("../../../assets/icons/home.png")}
              onPress={() => {
                navigation.navigate("Home");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="CATEGORIES"
              source={require("../../../assets/icons/category.png")}
              onPress={() => {
                navigation.navigate("Categories");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="SEARCH"
              source={require("../../../assets/icons/search.png")}
              onPress={() => {
                navigation.navigate("Search");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="Order History"
              source={require("../../../assets/icons/orderHistory.png")}
              onPress={() => {
                navigation.navigate("OrderHistory");
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="LogOut"
              source={require("../../../assets/icons/logout.png")}
              onPress={() => {
                this.signOut();
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
