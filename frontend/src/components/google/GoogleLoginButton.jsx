import {useAuth0} from "@auth0/auth0-react"

export default function GoogleLoginButton(){
    const {loginWithRedirect} = useAuth0()
    return (
        <button onClick={()=> loginWithRedirect()} className="bg-purple-primary text-white p-2 rounded-md cursor-pointer">Google</button>
    )
}