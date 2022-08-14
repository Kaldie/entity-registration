import { Menu } from "antd"
import { useRouter } from "next/router"


export default function Navbar() {
    const router = useRouter()
    const items = [
        { label: "Home", key: "Home", onClick: () => router.push("/") },
        {
            label: "Entities",
            key: "Entities",
            children:
                [
                    { label: "Exploration", key: "entity_exploration", onClick: () => router.push("/entity/exploration") },
                    { label: "Creation", key: "entity_creation", onClick: () => router.push("/entity/creation") },
                ]
        },
        {
            label: "Instance",
            key: "Instance",
            children:
                [
                    { label: "Exploration", key: "instance_exploration", onClick: () => router.push("/instance/exploration") }
                ]
        }
    ];

    return (
        <>
            <div className="logo" />
            <Menu items={items} mode="horizontal" defaultSelectedKeys={["Home"]} theme="dark" />
        </>
    )
}


