import { useSession, signOut } from "next-auth/react"


export default function Home() {
  const { data } = useSession()
  return (
  <>
    <h1>{JSON.stringify(data, null, 2)}</h1>
    <button onClick={() => signOut()}>deslogar</button>
  </>
  )
}
