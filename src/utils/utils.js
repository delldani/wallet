
export const showButton = (pathname,hasToken,job = '',buttonName = '')=>{
  if(!hasToken){
    return false;
  };
  if(job === 'parent' && buttonName === 'permission'){
    return false;
  }
  switch (pathname) {
      case "/":
        return false;
      case "/registration":
        return false;
      case "/permission":
         return true;
      case "/list":
          return true;
      case "/wallet":
          return true;
      default : return true;
      }  
}

export const isAllow = (job,pathname)=>{
  return job === 'parent' && pathname === 'permission' ? false : true;
}

export const getMyWallet = (wallets,userNmae)=>{
const newWallets = wallets.filter((wallet)=>wallet.name === userNmae);
const myWallet = newWallets.length ?  newWallets[0] : null;
return myWallet;
}