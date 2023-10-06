import Carousel from "react-multi-carousel";
import SmallPost from "./post/SmallPost";
import { SliderBtn } from "@/constants/constantData";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1050 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 1050, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};   

export default function PostsCarousel({posts}){
  return <Carousel infinite responsive={responsive} itemClass="smallPost-item" customRightArrow={<SliderBtn type='right'/>} customLeftArrow={<SliderBtn type='left'/>}>
    {posts.map(post=><SmallPost key={post.post_id} data={post}/>)}
  </Carousel>
}