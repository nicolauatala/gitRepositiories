import { createAppContainer, createStackNavigator } from "react-navigation";

import Lista from './pages/Lista';
import Issues from './pages/Issues';

export default createAppContainer(
    createStackNavigator({
        Lista,
        Issues
    })
); 