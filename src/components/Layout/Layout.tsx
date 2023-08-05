import { Logo } from "../Logo/Logo";
import { ModeToggleBtn } from "../ModeToggleBtn/ModeToggleBtn";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <section>
        <ModeToggleBtn />
      </section>
      <header>
        <Logo />
      </header>
      <main>{children}</main>
    </>
  );
}
