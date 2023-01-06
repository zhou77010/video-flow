import { LeftOutlined } from "@ant-design/icons";
import { FC } from "react";
import styles from './styles.module.scss'


interface Props{
  title:string
}
const NavBar:FC<Props> = (props) => {
  const {title} = props
  return(
    <nav className={styles.navBar}>
      <span className={styles.icon}>
        <LeftOutlined></LeftOutlined>
      </span>
      <span>{title}</span>
    </nav>
  )
}
export default NavBar;