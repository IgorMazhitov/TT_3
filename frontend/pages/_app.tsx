import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
} from "@nextui-org/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const pages = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Participants",
      link: "/participants",
    },
  ];
  return (
    <NextUIProvider>
      <Navbar className=" bg-gray-700">
        <NavbarBrand>
          <p className="font-bold text-inherit text-slate-200">Testing</p>
        </NavbarBrand>
        <NavbarContent>
          {pages.map((page) => (
            <NavbarItem key={page.title}>
              <Link className=" text-slate-200" href={page.link}>
                {page.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
