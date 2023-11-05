import Carousel from "react-multi-carousel";
import SmallPost from "../postElem/Small-Post";
import { SliderBtn, RESPONSIVE_CARDS } from "@/constants/constantData"; 

export default function PostsCarousel({posts}){
  return <Carousel infinite responsive={RESPONSIVE_CARDS} itemClass="smallPost-item" customRightArrow={<SliderBtn type='right'/>} customLeftArrow={<SliderBtn type='left'/>}>
    {posts.map(post=><SmallPost key={post.post_id} data={post}/>)}
  </Carousel>
}