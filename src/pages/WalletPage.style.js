
export const style = {
    height: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent:'center',
    "& .transaction-button": {
      width: "200px",
    },
    '& .table-wrapper':{
      marginBottom: '100px',
      width: '80%',
      display: 'flex',
      alignItems:'center',
      justifyContent: 'center',
      ['@media (max-width:1200px)']: {
        width: '100%',
      }
    },
  };
  