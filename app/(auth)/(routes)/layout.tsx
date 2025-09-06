import StarField from "@/components/starFeild"

 const AuthLayout=({children}:{children:React.ReactNode})=>{
return <div className="flex h-screen justify-center items-center bg-black">
    <StarField/>
    {children}
</div>
}

export default AuthLayout