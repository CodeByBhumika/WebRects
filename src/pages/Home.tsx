import Header from "../components/Header";
import Posts from "../components/Posts";
import SideBar from "../components/Sidebar";
import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#F0E9CC] min-h-screen">
      <Navbar />
      <Header />
      <div className="flex flex-col-reverse gap-8 px-4 py-5 mx-auto md:flex-row max-w-7xl">
        <div className="w-full md:w-3/4">
          <Posts />
        </div>
        <SideBar />
      </div>
      <Footer />
    </main>
  );
}