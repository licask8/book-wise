import { useSession, signOut } from "next-auth/react"
import { NextPageWithLayout } from "./_app"
import { DefaultLayout } from "@/layouts/DefaultLayout"


const HomePage: NextPageWithLayout = () => {
  const { data } = useSession()
  return (
  <>
    <h1>{JSON.stringify(data, null, 2)}</h1>
    <button onClick={() => signOut()}>deslogar</button>
  </>
  )
}

HomePage.getLayout = (page) => {
  return (
    <DefaultLayout title="Início">
      {page}
    </DefaultLayout>
  )
}

export default HomePage
