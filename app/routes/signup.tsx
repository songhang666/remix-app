import type {ActionFunction, LoaderArgs} from "@remix-run/node"
import {Form, Link} from "@remix-run/react"
import {authenticator} from "utils/auth.server"
import bcrypt from "bcryptjs"
import {getXataClient, XataClient} from "utils/xata"

const loader = async ({request}: LoaderArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/resolutions",
    })

    return user
}

const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const email = form.get("email") as string
    const password = form.get("password") as string

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const xata = getXataClient()
    const user = await xata.db.users.create({email, password: hashedPassword})
    console.log(user)

    return await authenticator.authenticate("form", request, {
        successRedirect: "/resolutions",
        failureRedirect: "/login",
        context: {formData: form},
    })
}

const LoginPage = () => {
    return (
        <Form method="post" className="p-10 text-center">
            <h1 className="font-bold text-xl">
                注册后可以创建待办事项
            </h1>

            <p className="mb-6">
                已经有了一个账号?{" "}
                <Link to="/login" className="text-blue-500">
                    登录
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
                注册
            </button>
        </Form>
    )
}

export default LoginPage
export {action, loader}
