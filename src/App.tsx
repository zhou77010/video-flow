import React from 'react';
import logo from './logo.svg';
import './App.scss';
import NavBar from './components/navBar/NavBar';
import Tabs from './components/tabs/Tabs';
import BannerImage from './assets/banner.png'
import FooterImage from './assets/footer.jpg'
import Category from './components/Category/Category';
import styles from './styles.module.scss'
import { dataSource } from './constants/data';

const App = () =>{
  return (
    <div className={styles.app}>
      <NavBar />
      <Tabs/>
      <div className={styles.line}></div>
      <img className={styles.banner} src={BannerImage} alt='banner'></img>
      <h2>{dataSource.hot.title}</h2>
      <Category list={dataSource.hot.list}/>
      <h2>{dataSource.live.title}</h2>
      <Category list={dataSource.live.list}/>
      <h2>{dataSource.recommend.title}</h2>
      <Category list={dataSource.recommend.list}/>
      <img className={styles.banner} src={FooterImage} alt='footer'></img>
      <footer className={styles.footer}>
        <span>
        @bilibili 2020

        </span>
      </footer>
    </div>
  );
}
export default App;
