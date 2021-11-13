import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Checkout from "../screens/Checkout";
import Receipt from "../screens/Receipt";
import PaymentPage from "../screens/Checkout/PaymentPage";
import OrderHistory from "../screens/OrderHistory";

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Recipe: RecipeScreen,
    RecipesList: RecipesListScreen,
    Ingredient: IngredientScreen,
    Search: SearchScreen,
    IngredientsDetails: IngredientsDetailsScreen,
    Login: Login,
    Signup: Signup,
    Checkout: Checkout,
    Receipt: Receipt,
    PaymentPage: PaymentPage,
    OrderHistory: OrderHistory,
  },
  {
    initialRouteName: "Signup",
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
    }),
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator,
  },
  {
    drawerPosition: "left",
    initialRouteName: "Main",
    drawerWidth: 250,
    contentComponent: DrawerContainer,
  }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
