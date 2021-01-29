import React, { useEffect } from 'react';
import { isMatch } from 'lodash';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { getSecondaryMenu } from '../actions';
import { Menu } from 'semantic-ui-react';

const messages = defineMessages({
  menu_selected: {
    id: 'Menu selezionato',
    defaultMessage: 'Menu selezionato',
  },
});

const SecondaryMenu = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  let items =
    useSelector((state) => state.secondaryMenu?.result)
      ?.filter((menu) =>
        (pathname?.length ? pathname : '/').match(new RegExp(menu.rootPath)),
      )
      .pop()?.items ?? [];
  items = items?.filter((item) => item.visible);

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
      <nav className="secondary-menu">
        <Menu stackable pointing secondary>
          {items.map((item, i) => {
            let url = item.href || item.linkUrl?.[0]?.['@id'] || '';

            return (
              <UniversalLink
                href={url === '' ? '/' : flattenToAppURL(url)}
                key={i}
                className={`item ${isMenuActive(url) && 'active'}`}
              >
                <span>{item.title}</span>
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
