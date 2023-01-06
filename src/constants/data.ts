import V1 from '../assets/1.mp4';
import V2 from '../assets/2.mp4';
import V3 from '../assets/3.mp4';
import V4 from '../assets/4.mp4';
import V5 from '../assets/5.mp4';
import V6 from '../assets/6.mp4';
import V7 from '../assets/7.mp4';
import V8 from '../assets/8.mp4';
import V9 from '../assets/9.mp4';

export interface VideoData {
  id: string;
  src: string;
}

const videoList1 = [
  {
    id:'11',
    src:V1,
  },
  {
    id:'12',
    src:V2,
  },
  {
    id:'13',
    src:V3,
  },
  {
    id:'14',
    src:V4,
  },
  {
    id:'15',
    src:V5,
  }
]

const videoList2 = [
  {
    id:'21',
    src:V2,
  },
  {
    id:'22',
    src:V9,
  },
  {
    id:'23',
    src:V7,
  },
  {
    id:'24',
    src:V6,
  },
  {
    id:'15',
    src:V5,
  }
]
const videoList3 = [
  {
    id: '31',
    src: V4,
  },
  {
    id: '32',
    src: V8,
  },
  {
    id: '33',
    src: V1,
  },
  {
    id: '34',
    src: V3,
  },
  {
    id: '35',
    src: V9,
  },
]
export const dataSource = {
  hot: {
    id: 'hot',
    title: '热门',
    list: videoList1,
  },
  recommend: {
    id: 'recommend',
    title: '推荐',
    list: videoList2,
  },
  live: {
    id: 'live',
    title: '直播',
    list: videoList3,
  },
}