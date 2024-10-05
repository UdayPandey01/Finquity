import Image from "next/image"
import Link from "next/link"

const HeaderLogo = ()=>{
    return(
        <Link href='/'>
        <div className="items-center hidden lg:flex">
            <Image src='/logo.png' alt="logo" height={43} width={43}/>
            <p className="font-semibold text-white text-2xl ml-2.5">
                Finquity
            </p>
        </div>
        </Link>
    )
}

export default HeaderLogo