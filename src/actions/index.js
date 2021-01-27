/**
 * Secondary menu items actions.
 * @module actions/getSecondaryMenu
 */
export const GET_SECONDARY_MENU = 'GET_SECONDARY_MENU';

/**
 * Get Secondary menu.
 * @function getSecondaryMenu
 * @returns {Object} Get secondary menu action.
 * Es: http://localhost:8080/Plone/@secondary-menu
 */
export function getSecondaryMenu() {
  return {
    type: GET_SECONDARY_MENU,
    request: {
      op: 'get',
      path: `/@secondary-menu`,
    },
  };
}
