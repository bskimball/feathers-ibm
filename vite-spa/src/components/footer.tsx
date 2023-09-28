import DarkModeToggle from "@components/dark-mode-toggle.tsx";

function Footer() {
  const date = new Date();

  return (
    <footer
      className={
        "shadow overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-black"
      }
    >
      <div className="container py-4">
        <div className="flex justify-between">
          <div>
            &copy;{" "}
            <a href="https://www.bdkinc.com" target="_blank">
              <span className="font-bold">BDK</span>
              <span>inc</span>
            </a>{" "}
            {date.getFullYear()}
          </div>
          <div className={"flex items-center space-x-8"}>
            <span>Dark Mode Toggle</span> <DarkModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
