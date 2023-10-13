import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export const sortPostOptions = [
     {name: 'Sort By'},
     {name: 'Latest', value: 'latest'},
     {name: 'Oldest', value: 'oldest'},
     {name: 'Name (A-Z)', value: 'name'},
     {name: 'Name (Z-A)', value: 'dName'},
]
export const getCategories = (type='standard')=>{
     const filterMode = type==='filter' ? [{name: 'Filter By Category'},{name: 'All', value: 'all'}] : [];
     return [...filterMode,
          {name: 'Science & Tech', value: 'science-tech'},
          {name: 'Arts & Crafts', value: 'arts-crafts'},
          {name: 'Mathematics', value: 'maths'},
          {name: 'Preschool', value: 'preschool'},
          {name: 'Literature', value: 'literature'},
          {name: 'Health & Sports', value: 'health-sports'},
          {name: 'History', value: 'history'},
          {name: 'Music', value: 'music'},
          {name: 'Gardening', value: 'gardening'},
          {name: 'Languages', value: 'langs'},
          {name: 'Arithmetics', value: 'arithmetics'},
          {name: 'Miscellaneous', value: 'misc'},
     ]
}
export const SliderBtn = ({onClick, type}) => <button onClick={()=>onClick()} className={`sliderBtn ${type==='left' ? "left" : "right"}`}>{type==='left' ?<FaChevronLeft/> : <FaChevronRight/>}</button>
export const POST_COMMENT_LIMIT = 4;