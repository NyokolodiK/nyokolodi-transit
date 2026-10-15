import HomeClient from "@/components/HomeClient";
import PopularRoutesSection from "@/components/PopularRoutesSection";

export default function Home() {
  return <HomeClient popularRoutes={<PopularRoutesSection />} />;
}
