# 本项目是基于remix构建前端页面 + xaza作为后端接口以及数据库支持的待办事项小应用demo(支持增删改查以及Authentication登录登出)

![](https://s3.bmp.ovh/imgs/2023/02/20/666ba6dd4743ce1c.png)

- [Remix Docs](https://remix.run/docs)
- [Xata.io](https://xata.io/)
- [Tailwind Docs](https://tailwindcss.com/)

## 使用

```sh
npm run install
```

```sh
npm run dev
```


# 创建数据库
1. 点击 `Add database`  

![](https://s3.bmp.ovh/imgs/2023/02/20/561e1f4337d473a8.png)

2. 创建两张表 `user和resolution`  ,定义字段以及把user表和resolution关联上

![](https://s3.bmp.ovh/imgs/2023/02/20/05675ab39462cde7.png)


数据结构如下

```typescript
{
  "id": "rec_abcdefg",
  "year": 2023,
  "resolution": "hi",
  "isCompleted": false,
}
```


# 初始化 Xata

1. 安装xata.io/cli  `npm install -g @xata.io/cli`
2. 启动 `xata auth login`
3. 选择 `Create a new API key in browser`
4. 输入 `new-resolutions` 作为 `名称`
5. 点击 `Create API key`
6. 输入 `xata init`
7. 选择 `new-resolutions` 作为 `数据库`
8. 选择 `Generate TypeScript code` 作为 `code generation`
9. 输入 `utils/xata.ts` 作为xata输出路径 `output file`
10. 选择 `<None>` 


`xata init`命令生成独立的`utils/xata.ts`文件。这包含`xata cli`和所有数据模型的类型。如果将来对数据库模式进行了更改，请运行`xata codegen`命令来生成一个新的`xata.ts`文件。


# 用户注册

1. 安装 `npm install remix-auth remix-auth-form`
2. 添加 `SESSION_SECRET` 到 `.env` 文件
3. 使用以下内容创建 `app/utils/session.server.ts` 

```typescript
import {createCookieSessionStorage} from "@remix-run/node"

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production",
    },
})

export {sessionStorage}
```

# 用户登录和登出

1. 登录在 `app/routes/login.tsx` 
2. 登出在 `app/routes/resolutions.tsx`

## 部署
  构建静态页面

```sh
npm run build
```

  启动生产环境

```sh
npm start
```

然后选择一个vps进行前端部署
