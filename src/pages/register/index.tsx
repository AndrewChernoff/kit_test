import { useNavigate } from "react-router-dom"
import { RegistrationForm } from "../../components/ui/register-form"
import { useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"

export const Register = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])
  
  return (
    <><RegistrationForm /></>
  )
}
