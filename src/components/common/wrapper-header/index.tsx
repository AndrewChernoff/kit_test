import { Header } from '../../ui/header/index';
import { ReactNode } from 'react'


const WrapperHeader = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default WrapperHeader 