import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="mx-auto max-w-4xl px-8 pyz-2">
        <div className="flex justify-between items-center">
            <h1 className="text-sm">© N1tch / Irakli</h1>
            <div className="md:px-4">
                <Link href="https://github.com/N1tchVar">
                <IconBrandGithub size={18}/>
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Footer