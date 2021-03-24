import { secondaryMenuReducer } from './reducers';
import SecondaryMenuConfigurationWidget from './widget/SecondaryMenuConfigurationWidget';
import { getSecondaryMenu } from './actions';
import SecondaryMenu from './components/SecondaryMenu';

export { SecondaryMenuConfigurationWidget, getSecondaryMenu, SecondaryMenu };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    secondary_menu_configuration: SecondaryMenuConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    secondaryMenu: secondaryMenuReducer,
  };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders ?? []),
    {
      path: '/',
      extend: (dispatchActions) => {
        dispatchActions.push({
          key: 'secondary-menu',
          promise: ({ location, store: { dispatch } }) =>
            __SERVER__ && dispatch(getSecondaryMenu()),
        });

        return dispatchActions;
      },
    },
  ];

  return config;
};
