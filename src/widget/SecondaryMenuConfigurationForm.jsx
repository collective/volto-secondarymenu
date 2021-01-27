import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form, Grid, Button } from 'semantic-ui-react';
import {
  TextWidget,
  CheckboxWidget,
  ObjectBrowserWidget,
  Sidebar,
} from '@plone/volto/components';
import { Portal } from 'react-portal';

const messages = defineMessages({
  title: {
    id: 'secondarymenu-title',
    defaultMessage: 'Title',
  },
  visible: {
    id: 'secondarymenu-visible',
    defaultMessage: 'Visible',
  },
  linkUrl: {
    id: 'secondarymenu-linkUrl',
    defaultMessage: 'Link',
  },
  navigationRoot: {
    id: 'secondarymenu-navigationRoot',
    defaultMessage: 'Navigation root',
  },
  showMoreLink: {
    id: 'secondarymenu-showMoreLink',
    defaultMessage: '"Show more" link',
  },
  showMoreText: {
    id: 'secondarymenu-showMoreText',
    defaultMessage: '"Show more" link text',
  },
  blocks: {
    id: 'secondarymenu-blocks',
    defaultMessage: 'Blocks',
  },
  blocks_description: {
    id: 'secondarymenu-blocks-description',
    defaultMessage: 'Add some blocks to show in dropdown menu.',
  },
  deleteMenuItem: {
    id: 'secondarymenu-deletemenuitem',
    defaultMessage: 'Delete menu item',
  },
  deleteButton: {
    id: 'secondarymenu-deletemenuitem-button',
    defaultMessage: 'Delete menu item',
  },
});

const SecondaryMenuConfigurationForm = ({
  id,
  menuItem,
  onChange,
  deleteMenuItem,
}) => {
  const intl = useIntl();

  const preventClick = (e) => {
    e.preventDefault();
  };

  const preventEnter = (e) => {
    if (e.code === 'Enter') {
      preventClick(e);
    }
  };

  useEffect(() => {
    document
      .querySelector('form.ui.form')
      .addEventListener('click', preventClick);

    document.querySelectorAll('form.ui.form input').forEach((item) => {
      item.addEventListener('keypress', preventEnter);
    });

    return () => {
      document
        .querySelector('form.ui.form')
        .removeEventListener('click', preventClick);
      document.querySelectorAll('form.ui.form input').forEach((item) => {
        item.removeEventListener('keypress', preventEnter);
      });
    };
  }, []);

  const onChangeFormData = (id, value) => {
    onChange({ ...menuItem, [id]: value });
  };

  return (
    <>
      <TextWidget
        id={`${id}-title`}
        title={intl.formatMessage(messages.title)}
        description=""
        required={true}
        value={menuItem.title}
        onChange={(id, value) => onChangeFormData('title', value)}
      />
      <ObjectBrowserWidget
        id={`${id}-linkUrl`}
        title={intl.formatMessage(messages.linkUrl)}
        description=""
        required={true}
        mode="link"
        value={menuItem.linkUrl ?? []}
        onChange={(id, value) => onChangeFormData('linkUrl', value)}
      />

      <CheckboxWidget
        id={`${id}-visible`}
        title={intl.formatMessage(messages.visible)}
        description=""
        defaultValue={true}
        value={!!menuItem.visible}
        onChange={(id, value) => onChangeFormData('visible', value)}
      />

      <Form.Field inline className="delete wide" id="menu-delete">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={12}>
              <Button
                icon="trash"
                onClick={deleteMenuItem}
                id="delete-menuitem"
                negative
                content={intl.formatMessage(messages.deleteButton)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
      <Portal node={document.getElementById('sidebar')}>
        <Sidebar />
      </Portal>
    </>
  );
};

export default React.memo(SecondaryMenuConfigurationForm);
