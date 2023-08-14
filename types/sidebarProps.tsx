import { StaticImageData } from "next/image"


export type sidebarItems = {
    sidebarMenuData: sidebarProps[]
}
export type sidebarProps = {
    icon: StaticImageData;
    item: string;
    link: string
}