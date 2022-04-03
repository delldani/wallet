
export const showButton = (name, pathname,hasToken) => {
  switch (name) {
    case "logout-button":
      if (pathname === "/" || pathname === '/registration') {
        return false;
      } else if ((pathname === "/list" || pathname === "/wallet" || pathname === "/permission" ) && hasToken) {
        return true;
      }else return false;

      case "list":
      // code block
      break;
    default:
      return true;
  }
};
