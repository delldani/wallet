import {translations} from '../utils/default'

export const ErrorFallback = ({error})=> {
    return (
      <div role="alert">
        <p>{translations.error}</p>
        <pre style={{color: 'red'}}>{error.message}</pre>
      </div>
    )
  }