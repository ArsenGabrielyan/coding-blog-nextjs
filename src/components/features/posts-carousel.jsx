import Carousel from "react-multi-carousel";
import SmallPost from "../postElem/Small-Post";
import { RESPONSIVE_CARDS } from "@/constants/constantData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SliderBtn = ({onClick, type}) => <button type="button" onClick={onClick} className={`sliderBtn ${type==='left' ? "left" : "right"}`}>{type==='left' ?<FaChevronLeft/> : <FaChevronRight/>}</button>

export default function PostsCarousel({posts}){
  return <Carousel infinite responsive={RESPONSIVE_CARDS} itemClass="smallPost-item" customRightArrow={<SliderBtn type='right'/>} customLeftArrow={<SliderBtn type='left'/>}>
    {posts.map(post=><SmallPost key={post.post_id} data={post}/>)}
  </Carousel>
}