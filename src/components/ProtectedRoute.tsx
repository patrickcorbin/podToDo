import { Redirect } from "react-router-dom"
import { useIonRouter  } from "@ionic/react"
import { useAuth } from "../AuthContext"


const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth()
    const router = useIonRouter()

    if (!user) {
        router.push('/login', 'forward', 'replace')
    }

    return <>{children}</>

}

export default ProtectedRoute