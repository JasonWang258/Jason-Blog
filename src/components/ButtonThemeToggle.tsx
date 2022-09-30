import * as React from "react";

type Theme = "light" | "dark";

export default function ButtonThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(() => {
		if (import.meta.env.SSR) {
			return "dark";
		}
		return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	});
  const rootEl =
    typeof document !== "undefined" ? document.documentElement : null;

  // React.useEffect(() => {
  //   if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
  //     setTheme(localStorage.getItem("theme") as Theme);
  //   } else if (
  //     typeof window !== "undefined" &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     setTheme("dark");
  //   }
  // });

  React.useEffect(() => {
    if (rootEl && theme === "light") {
      rootEl.classList.remove("dark");
    } else if (rootEl && theme === "dark") {
      rootEl.classList.add("dark");
    }
  }, [theme]);

  function handleThemeChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.checked);
    if (event.target.checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  const darkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 20 20"
    >
      <path d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z" />
    </svg>
  );
  const lightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 20 20"
    >
      <path d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z" />
    </svg>
  );

  return (
    <div className="inline-flex bg-slate-100 dark:bg-gray-700 rounded-full drop-shadow-md w-[56px] transition duration-100 ease-linear">
      <label
        className="p-1 fill-slate-900 dark:fill-slate-200 bg-slate-300 dark:bg-slate-500 rounded-full transform duration-100 ease-linear cursor-pointer dark:translate-x-full translate-x-0"
        htmlFor="theme-toggle"
      >
        {theme === "dark" ? darkIcon : lightIcon}
      </label>
      <input
        id="theme-toggle"
        type="checkbox"
        name="theme-toggle"
        checked={theme === "dark"}
        title={`Use ${theme} theme`}
        className="hidden"
        onChange={handleThemeChange}
      />
    </div>
  );
}
