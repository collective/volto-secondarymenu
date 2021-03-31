import React, { useEffect } from 'react';
import { isMatch } from 'lodash';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { getSecondaryMenu } from '../actions';
import { getItemsByPath } from '../utils';
import { Menu } from 'semantic-ui-react';

const messages = defineMessages({
  menu_selected: {
    id: 'secondarymenu-menu-selected',
    defaultMessage: 'Selected menu',
  },
  secondarymenu_aria: {
    id: 'secondarymenu-menu-arialabel',
    defaultMessage: 'Secondary menu',
  },
});

const SecondaryMenu = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const menuItems = useSelector((state) => state.secondaryMenu?.result);
  const items = getItemsByPath(menuItems, pathname)?.filter(
    (item) => item.visible,
  );

  useEffect(() => {
    dispatch(getSecondaryMenu());
  }, [dispatch]);

  const isMenuActive = (itemUrl = '') => {
    const url = flattenToAppURL(itemUrl);
    const currrentPath = pathname ?? '';

    return (
      (url === '' && (currrentPath === '/' || currrentPath === '')) ||
      (url !== '' && isMatch(currrentPath.split('/'), url.split('/')))
    );
  };

  return (
    items?.length > 0 && (
      <nav
        className="secondary-menu"
        role="navigation"
        aria-label={intl.formatMessage(messages.secondarymenu_aria)}
      >
        <Menu stackable pointing secondary>
          {items.map((item, i) => {
            let url = item.href || item.linkUrl?.[0]?.['@id'] || '';

            return (
              <UniversalLink
                href={url === '' ? '/' : flattenToAppURL(url)}
                key={i}
                className={`item ${isMenuActive(url) && 'active'}`}
              >
                <span className={item.inEvidence ? 'in-evidence' : ''}>
                  {item.title}
                </span>
                {isMenuActive(url) && (
                  <span className="sr-only">
                    {intl.formatMessage(messages.menu_selected)}
                  </span>
                )}
              </UniversalLink>
            );
          })}
        </Menu>
      </nav>
    )
  );
};

SecondaryMenu.propTypes = {};

export default SecondaryMenu;
