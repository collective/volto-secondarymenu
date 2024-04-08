import menuAltSVG from '@plone/volto/icons/menu-alt.svg';
import { secondaryMenuReducer } from './reducers';
import {
  SecondaryMenuConfigurationWidget,
  SecondaryMenuConfigurationForm,
} from './widget';
import { getSecondaryMenu } from './actions';
import { getItemsByPath } from './utils';
import SecondaryMenu from './components/SecondaryMenu';

export {
  SecondaryMenuConfigurationWidget,
  SecondaryMenuConfigurationForm,
  getSecondaryMenu,
  SecondaryMenu,
  getItemsByPath,
};

export default (config) => {
  config.registerComponent({
    name: 'SecondaryMenuConfigurationForm',
    component: SecondaryMenuConfigurationForm,
  });

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
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === 'secondary-menu',
          ).length === 0
        ) {
          dispatchActions.push({
            key: 'secondary-menu',
            promise: ({ location, store: { dispatch } }) =>
              __SERVER__ && dispatch(getSecondaryMenu()),
          });
        }

        return dispatchActions;
      },
    },
  ];

  config.settings.controlPanelsIcons['secondary-menu-settings'] = menuAltSVG;

  return config;
};
