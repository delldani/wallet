
export const showButton = (name, pathname,hasToken) => {
  switch (name) {
    case "logout-button":
      if (pathname === "/" || pathname === '/registration') {
        return false;
      } else if ((pathname === "/list" || pathname === "/wallet" || pathname === "/permission" ) && hasToken) {
        return true;
      }else return false;

      case "permission-button":
        if (pathname === "/" || pathname === '/registration') {
          return false;
        } else if ((pathname === "/list" || pathname === "/wallet" || pathname === "/permission" ) && hasToken) {
          return true;
        }else return false;
      case 'walletlist-button':
        if (pathname === "/" || pathname === '/registration') {
          return false;
        } else if ((pathname === "/list" || pathname === "/wallet" || pathname === "/permission" ) && hasToken) {
          return true;
        }else return false;
    default:
      return true;
  }
};
