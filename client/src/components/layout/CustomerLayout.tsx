import { Outlet } from "react-router-dom";


export function CustomerLayout() {
    return <div className="min-h-screen bg-background text-foreground">
        {/* navbar */}
        <main>
            <Outlet />
        </main>
    </div>
}