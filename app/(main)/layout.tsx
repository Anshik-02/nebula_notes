// app/dashboard/layout.tsx
import ClientLoaderWrapper from "@/components/loader-wrapper";
import AppSidebar from "@/components/sidebar/app-sidebar";
import PhoneSidebar from "@/components/sidebar/phone-sidebar";
import ThemeDropdown from "@/components/theme-dropdown";
import { ThemeProvider } from "@/context/theme-context";


export default async function Layout({ children }: { children: React.ReactNode }) {
  // Optional server-side data fetching here
  // const profile = await initialProfile();

  return (
    <ThemeProvider>
      <ClientLoaderWrapper>
        <div className="flex min-h-screen md:ml-70">
          <AppSidebar />
          <PhoneSidebar />
          <div className="absolute top-5 right-5">
            <ThemeDropdown />
          </div>
          <div className="flex-1 h-screen">{children}</div>
        </div>
      </ClientLoaderWrapper>
    </ThemeProvider>
  );
}
