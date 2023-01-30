import { setCookie } from "cookies-next"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

export type FormData = {
  email: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!data.email || !data.password) {
        alert("Tolong isi")
      } else {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        if (response.status === 200) {
          const data = await response.json()
          setCookie("access_token", data.data.access_token)
          setCookie("email", data.data.email)
          router.push("/dashboard")
        }
      }
    } catch (e) {
      console.log("SOME ERROR HAPPENED", e)
    }
  })

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
