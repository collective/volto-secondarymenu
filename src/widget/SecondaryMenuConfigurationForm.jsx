import React, { useEffect } from 'react';
import { compose } from 'redux';
import { defineMessages, useIntl } from 'react-intl';
import { Form, Grid, Button } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import {
  TextWidget,
  CheckboxWidget,
} from '@plone/volto/components/manage/Widgets';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  title: {
    id: 'secondarymenu-title',
    defaultMessage: 'Title',
  },
  visible: {
    id: 'secondarymenu-visible',
    defaultMessage: 'Visible',
  },
  inEvidence: {
    id: 'secondarymenu-inevidence',
    defaultMessage: 'In evidence',
  },
  linkUrl: {
    id: 'secondarymenu-linkUrl',
    defaultMessage: 'Link',
  },
  linkUrl_description: {
    id: 'secondarymenu-linkUrl_description',
    defaultMessage:
      'Type an external url, or select an internal url clicking on the right button',
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
  openObjectBrowser,
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

  const url = menuItem.linkUrl?.[0]?.['@id'] ?? menuItem.href ?? null;

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
      {/* <ObjectBrowserWidget
        id={`${id}-linkUrl`}
        title={intl.formatMessage(messages.linkUrl)}
        description=""
        required={true}
        mode="link"
        value={menuItem.linkUrl ?? []}
        onChange={(id, value) => onChangeFormData('linkUrl', value)}
      /> */}

      <TextWidget
        id={`${id}-linkUrl`}
        title={intl.formatMessage(messages.linkUrl)}
        description={intl.formatMessage(messages.linkUrl_description)}
        required={true}
        value={url ? flattenToAppURL(url) : null}
        icon={url ? clearSVG : navTreeSVG}
        iconAction={
          url
            ? () => {
                onChangeFormData('linkUrl', '');
              }
            : () =>
                openObjectBrowser({
                  mode: 'link',
                  onSelectItem: (url, item) => {
                    onChangeFormData('linkUrl', [item]);
                  },
                })
        }
        onChange={(id, value) => onChangeFormData('href', value)}
      />
      <CheckboxWidget
        id={`${id}-visible`}
        title={intl.formatMessage(messages.visible)}
        description=""
        defaultValue={true}
        value={!!menuItem.visible}
        onChange={(id, value) => onChangeFormData('visible', value)}
      />
      <CheckboxWidget
        id={`${id}-inEvidence`}
        title={intl.formatMessage(messages.inEvidence)}
        description=""
        defaultValue={false}
        value={!!menuItem.inEvidence}
        onChange={(id, value) => onChangeFormData('inEvidence', value)}
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
    </>
  );
};

export default React.memo(
  compose(withObjectBrowser)(SecondaryMenuConfigurationForm),
);
