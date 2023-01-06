import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import NavBar from "./components/navBar/NavBar";
import Tabs from "./components/tabs/Tabs";
import BannerImage from "./assets/banner.png";
import FooterImage from "./assets/footer.jpg";
import Category from "./components/Category/Category";
import styles from "./styles.module.scss";
import { dataSource } from "./constants/data";
import classNames from "classnames";


const App = () => {
  const oldYRef = React.useRef(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [hidden,setHidden] = React.useState(false)
  const onScroll = () => {
    if(contentRef.current){
      const {top:newY} = contentRef.current.getBoundingClientRect()
      const delta = newY - oldYRef.current
      oldYRef.current = newY
      if(delta<0){
        setHidden(true)
      }
      else{
        setHidden(false)
  
      }

    }

  };
  return (
    <div className={styles.app}>
      {/* <header className={classNames(styles.header,{[styles.hidden]:hidden})}> */}
      <header className={classNames(styles.header, { [styles.hidden]: hidden })}>
      
        <NavBar title={"首页"} />
        <Tabs />
      </header>

      <div className={styles.line}></div>

      <div className={styles.scrollView} onScroll={onScroll}>
        <img className={styles.banner} src={BannerImage} alt="banner"></img>
        <div ref = {contentRef} className={styles.content}>
          <h2>{dataSource.hot.title}</h2>

          <Category list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>

          <Category list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>

          <Category list={dataSource.recommend.list} />
        </div>

        <img className={styles.banner} src={FooterImage} alt="footer"></img>

        <footer className={styles.footer}>
          <span>@bilibili 2020</span>
        </footer>
      </div>
    </div>
  );
};
export default App;
