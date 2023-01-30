import { GetServerSideProps, NextPage } from "next"
import { CookieValueTypes, getCookie } from "cookies-next"

type DahsboardProps = {
  id: string
  name: string
  phone_number: string
  email: string
}

interface Props {
  data: DahsboardProps
}

const Dashboard: NextPage<Props> = (props) => {
  const { data } = props

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <h1 className="text-3xl font-semibold text-center text-black-700 uppercase mb-4">
        User
      </h1>
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Email</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {data?.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{data?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{data?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {data?.phone_number}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const email = getCookie("email", { req, res })
  const access_token: CookieValueTypes = getCookie("access_token", { req, res })

  const response = await fetch(`http://localhost:4000/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${access_token}`,
    },
  })

  const result = await response.json()

  if (result.message === "Session Expired") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const data: DahsboardProps = result?.data

  return {
    props: {
      data,
    },
  }
}

export default Dashboard
