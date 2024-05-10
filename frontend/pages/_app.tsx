import {
  Link,
  Navbar,
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
      <Navbar>
        <NavbarContent>
          {pages.map((page) => (
            <NavbarItem key={page.title}>
              <Link href={page.link}>{page.title}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
