import { StaticImageData } from "next/image"


export type sidebarItems = {
    sidebarMenuData: sidebarProps[]
}
export type sidebarProps = {
    icon: any;
    item: string;
    link: string
}