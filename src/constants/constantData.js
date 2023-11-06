import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAccountCircle, MdAppSettingsAlt } from "react-icons/md";
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
export const settingPages = [
     {name: 'account', title: 'Account', IconName: MdAccountCircle},
     {name: 'advanced', title: 'Advanced', IconName: MdAppSettingsAlt}
];
export const SliderBtn = ({onClick, type}) => <button type="button" onClick={onClick} className={`sliderBtn ${type==='left' ? "left" : "right"}`}>{type==='left' ?<FaChevronLeft/> : <FaChevronRight/>}</button>
export const POST_COMMENT_LIMIT = 4;
export const RESPONSIVE_CARDS = {
     superLargeDesktop: {
       breakpoint: { max: 4000, min: 1050 },
       items: 5,
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