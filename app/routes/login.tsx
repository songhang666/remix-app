import type {ActionFunction, LoaderArgs} from "@remix-run/node"
import {Form, Link} from "@remix-run/react"
import {authenticator} from "utils/auth.server"

const loader = async ({request}: LoaderArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/resolutions",
    })

    return user
}

const action: ActionFunction = async ({request}) => {
    return authenticator.authenticate("form", request, {
        successRedirect: "/resolutions",
        failureRedirect: "/login",
    })
}

const LoginPage = () => {
    return (
        <Form method="post" className="p-10 text-center">
            <h1 className="font-bold text-xl">
                登录查看你的待办事项
            </h1>
            <p className="mb-6">
                还没有一个账号?{" "}
                <Link to="/signup" className="text-blue-500">
                    注册
                </Link>
            </p>

            <label className="font-semibold mr-2" htmlFor="email">
                邮箱
            </label>
            <input
                className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                type="email"
                name="email"
                id="email"
            />

            <label className="font-semibold mr-2" htmlFor="password">
                密码
            </label>
            <input
                className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                type="password"
                name="password"
                id="password"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 rounded-md font-semibold"
            >
                登录
            </button>
        </Form>
    )
}

export default LoginPage
export {action, loader}
