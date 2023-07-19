import "./App.scss";
import classNames from "classnames";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useApp } from "./context/AppContext";

const namespace = "app";

function App() {
  const { theme } = useApp();
  const componentClassNames = classNames(namespace, {
    [`${namespace}--dark`]: theme === "dark",
  });

  const menuOptions = [
    {
      name: "Home",
      target: "/",
    },
    {
      name: "Add product",
      target: "/add-product",
    },
  ];

  return (
    <div className={componentClassNames}>
      <NavBar menuOptions={menuOptions} fixed />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
