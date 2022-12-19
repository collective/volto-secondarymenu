# volto-secondarymenu

Volto addon for a customizable secondary menu

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

Created with [voltocli](https://github.com/nzambello/voltocli).

> If you're using Volto < 12, then use [v1.1.0](https://github.com/collective/volto-secondarymenu/tree/v1.1.0)
>
> If you're using Volto < 16, then use [v2.2.0](https://github.com/collective/volto-secondarymenu/tree/v2.2.0)

## Usage

To customize the `SecondaryMenuConfigurationForm` component, you can now create your own component in your site and replace it using the Volto component registry in your site config file:

```javascript
import MySecondaryMenuConfigurationForm from './src/MySecondaryMenuConfigurationForm';

config.registerComponent({
  name: 'SecondaryMenuConfigurationForm',
  component: MySecondaryMenuConfigurationForm,
});
```
