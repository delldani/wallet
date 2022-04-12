import Box from "@mui/material/Box";

import {translations} from '../utils/default'

export const ErrorFallback = ({error})=> {

  return (
      <Box sx={style}>
            <p>{translations.error}</p>
            <div style={{color: 'red',maxWidth: '80%'}}>{error.message}</div>
      </Box>
    )
  }

  const style={
      width:'100vw',
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',

  }