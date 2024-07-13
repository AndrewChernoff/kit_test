import { useEffect } from "react"
import { LoginForm } from "../../components/ui/login-form"
import { useAppSelector } from "../../redux/hooks"
import { useNavigate } from "react-router-dom"


export const Login = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <><LoginForm /></>
  )
}
