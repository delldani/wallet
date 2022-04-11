import Box from "@mui/material/Box";

import {translations} from '../utils/default'

export const ErrorFallback = ({error})=> {
    return (
      <Box sx={style}>
          <div>
            <p>{translations.error}</p>
            <pre style={{color: 'red'}}>{error.message}</pre>
          </div>
      </Box>
    )
  }

  const style={
      width:'100vw',
      height:'100vh',
      display:'grid',
      placeItems:'center',
  }