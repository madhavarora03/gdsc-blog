1. Create next app
    (typescript, eslint, tailwind, src, no import alias)

creating env file and adding to gitignore

create supabase project and add project url to env file

initialize drizzle orm
```
pnpm add drizzle-orm postgres @auth/drizzle-adapter
pnpm add -D drizzle-kit
```
modifying package.json adding scripts && installing dotenv-cli && making drizzle.config.ts

creating folder structure src -> server -> db & trpc

creating a auth based schema inside schema.ts && pushing it to supabase after changing es5 to es6

creating db/index.ts and creating a drizzle driver

adding next auth

creating dynamic route and server/auth.ts

Now adding trpc