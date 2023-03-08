// "use client";
import CollectionsContainer from "@/components/collections/CollectionsContainer";
import ContainerSidebar from "@/components/sidebar/ContainerSidebar";
export default function Home() {
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
