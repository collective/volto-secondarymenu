import { secondaryMenuReducer } from './reducers';
import SecondaryMenuConfigurationWidget from './widget/SecondaryMenuConfigurationWidget';
import { getSecondaryMenu } from './actions';
import SecondaryMenu from './components';

export { SecondaryMenuConfigurationWidget, getSecondaryMenu };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    //secondary_menu_configuration: SecondaryMenuConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    secondaryMenu: secondaryMenuReducer,
  };

  return config;
};
