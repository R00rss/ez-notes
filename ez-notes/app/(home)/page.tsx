"use client";
import CollectionsContainer from "@/components/collections/CollectionsContainer";
import ContainerSidebar, {
  SidebarMenuContextType,
} from "@/components/sidebar/ContainerSidebar";
import { SidebarMenuContext } from "@/components/sidebar/ContainerSidebar";
import { useContext } from "react";
export default function Home() {
  const { selected_option } =
    useContext<SidebarMenuContextType>(SidebarMenuContext);
  console.log(selected_option);
  return (
    <div className="w-full flex flex-row">
      <ContainerSidebar>
        <section className="w-full h-[100dvh] overflow-auto pb-12">
          <CollectionsContainer />
        </section>
      </ContainerSidebar>
    </div>
  );
}
