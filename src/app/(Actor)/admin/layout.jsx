import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="container mx-auto">
            <div className='flex'>
                <div className="w-auto">
                    <Sidebar/>
                </div>
                <div className="w-[75%] p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
