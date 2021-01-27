import { secondaryMenuReducer } from './reducers';
import SecondaryMenuConfigurationWidget from './widget/SecondaryMenuConfigurationWidget';
import { getSecondaryMenu } from './actions';

export { SecondaryMenuConfigurationWidget, getSecondaryMenu };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    secondarymenu_configuration: SecondaryMenuConfigurationWidget,
    menu_configuration: SecondaryMenuConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    secondaryMenu: secondaryMenuReducer,
    // dropdownMenuNavItems: secondaryMenuReducer,
  };

  return config;
};
