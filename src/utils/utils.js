//TODO egyszerúsíteni

export const showButton = (buttonName, pathname, hasToken, job) => {
  switch (buttonName) {
    case "logout-button":
      if (pathname === "/" || pathname === "/registration") {
        return false;
      } else if (
        (pathname === "/list" ||
          pathname === "/wallet" ||
          pathname === "/permission") &&
        hasToken
      ) {
        return true;
      } else return false;

    case "permission-button":
      if (
        pathname === "/" ||
        pathname === "/registration" ||
        job === "parent"
      ) {
        return false;
      } else if (
        (pathname === "/list" ||
          pathname === "/wallet" ||
          pathname === "/permission") &&
        hasToken
      ) {
        return true;
      } else return false;
    case "walletlist-button":
      if (pathname === "/" || pathname === "/registration") {
        return false;
      } else if (
        (pathname === "/list" ||
          pathname === "/wallet" ||
          pathname === "/permission") &&
        hasToken
      ) {
        return true;
      } else return false;
    case "wallet-button":
      if (pathname === "/" || pathname === "/registration") {
        return false;
      } else if (
        (pathname === "/list" ||
          pathname === "/wallet" ||
          pathname === "/permission") &&
        hasToken &&
        job !== "director"
      ) {
        return true;
      } else return false;
    default:
      return true;
  }
};

export const isAllow = (job,pathname)=>{
  return job === 'parent' && pathname === 'permission' ? false : true;
}

export const getMyWallet = (wallets,userNmae)=>{
const newWallets = wallets.filter((wallet)=>wallet.name === userNmae);
const myWallet = newWallets.length ?  newWallets[0] : null;
return myWallet;
}