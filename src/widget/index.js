import loadable from '@loadable/component';

export const SecondaryMenuConfigurationForm = loadable(() =>
  import(
    /* webpackChunkName: "volto-secondarymenu-manage" */ './SecondaryMenuConfigurationForm'
  ),
);

export const SecondaryMenuConfigurationWidget = loadable(() =>
  import(
    /* webpackChunkName: "volto-secondarymenu-manage" */ './SecondaryMenuConfigurationWidget'
  ),
);
