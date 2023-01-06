import React, { useEffect } from "react";
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
// import {debounce} from 'lodash';
const isInView = (el: HTMLVideoElement) => {
  const { top, bottom, left, right } = el.getBoundingClientRect();
  const isHorizontalInView = 0 < left && right < window.innerWidth;
  const isVerticalInView =
    top < window.innerHeight / 2 && window.innerHeight / 2 < bottom;

  return isHorizontalInView && isVerticalInView;
};
const App = () => {
  function debounce(fn: any, time: any) {
    let timer: any = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
      }, time);
    };
  }
  const oldYRef = React.useRef(0);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef<HTMLDivElement>(null);


  const [hidden, setHidden] = React.useState(false);
  const playingIds = React.useRef<string[]>([]);
  const isScrolling = React.useRef(false);

  const playAll = (ids: string[]) => {
    if (ids.length === 0) return;
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((el) => {
      el.play();
    });
    playingIds.current = ids;
  };
  const stopAll = (ids: string[]) => {
    if (ids.length === 0) return;
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((el) => {
      el.pause();
      el.currentTime = 0;
    });
  };
  const pauseAll = (ids: string[]) => {
    if (ids.length === 0) return;
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((el) => {
      el.pause();
      el.currentTime = 0;
    });
  };
  const onScrollEnd = React.useCallback(
    debounce(() => {
      const videoEls = Array.from(document.querySelectorAll("video"));
      console.log(videoEls);

      const inViewVideoEls = videoEls.filter((el) => isInView(el));
      if (inViewVideoEls.length > 0) {
        const ids: string[] = inViewVideoEls.map(
          (el) => el.getAttribute("data-video-id") || ""
        );
        const stopIds = playingIds.current.filter((id) => !ids.includes(id));
        stopAll(stopIds);
        playAll(ids);
        console.log(ids);
      } else {
        playAll(playingIds.current);
      }
      // console.log('end')
      isScrolling.current = false;
    }, 500),
    []
  );

  const onScroll = () => {
    if (!isScrolling.current) {
      pauseAll(playingIds.current);
    }

    isScrolling.current = true;

    if (contentRef.current && offsetRef.current) {
      const { bottom: offsetBottom } =
        offsetRef.current.getBoundingClientRect();

      // 下滑超过 56 px 才做交互
      if (offsetBottom < 0) {
        const { top: newY } = contentRef.current.getBoundingClientRect();

        // 计算向上还是向下滑动
        const delta = newY - oldYRef.current;

        // 更新上一次的 Y 值
        oldYRef.current = newY;

        setHidden(delta < 0);
      }
    }

    // 停下来超过 500ms 则认为是 scroll end
    onScrollEnd();
  };

  useEffect(() => {
    const initVideoIds = dataSource.hot.list.slice(0, 2).map((item) => item.id);
    playAll(initVideoIds);
  }, []);
  return (
    <div className={styles.app}>
      {/* <header className={classNames(styles.header,{[styles.hidden]:hidden})}> */}
      <header
        className={classNames(styles.header, { [styles.hidden]: hidden })}
      >
        <NavBar title={"首页"} />
        <Tabs />
      </header>

      <div className={styles.line}></div>

      <div className={styles.scrollView} onScroll={onScroll}>
      <div ref={offsetRef} className={styles.offset}/>
        <img className={styles.banner} src={BannerImage} alt="banner"></img>
        <div ref={contentRef} className={styles.content}>
          <h2>{dataSource.hot.title}</h2>

          <Category onScroll={onScroll} list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>

          <Category onScroll={onScroll} list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>

          <Category onScroll={onScroll} list={dataSource.recommend.list} />
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
