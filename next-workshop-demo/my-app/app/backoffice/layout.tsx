import "../../public/plugins/fontawesome-free/css/all.min.css";
import "../../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "../../public/dist/css/adminlte.min.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Navbar />
          <Sidebar />
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
