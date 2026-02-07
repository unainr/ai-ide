import { PropsLayout } from '@/types'

const Layout = ({children}:PropsLayout) => {
  return (
     <div className="grid min-h-svh lg:grid-cols-2 bg-white ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
       
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-xs">
           {children}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1714715350295-5f00e902f0d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhZXJ8ZW58MHwxfDB8fHww&auto=format&fit=crop&q=60&w=900"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  )
}

export default Layout