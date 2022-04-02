
export const showButton = (name, pathname) => {
  switch (name) {
    case "login-button":
      if (pathname === "/") {
        return false;
      } else if (pathname === "/list") {
        return false;
      }
      break;
    case "list":
      // code block
      break;
    default:
      return true;
  }
};
