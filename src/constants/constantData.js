import { MdAccountCircle, MdAppSettingsAlt, MdChevronLeft, MdChevronRight } from "react-icons/md";

export const POST_COMMENT_LIMIT = 4;
export const SEARCH_LIMIT = 7;
export const MAIN_PAGE_LIMIT = 3;

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
export const DEFAULT_PAGINATION_PROPS = {
  nextLabel: <MdChevronRight/>,
  previousLabel: <MdChevronLeft/>,
  containerClassName: "pagination",
  previousLinkClassName: "prev-btn",
  nextLinkClassName: "next-btn",
  disabledClassName: "disabled",
  activeClassName: "active",
}

export const sortPostOptions = [
  {name: 'Sort By'},
  {name: 'Latest', value: 'latest'},
  {name: 'Oldest', value: 'oldest'},
  {name: 'Name (A-Z)', value: 'name'},
  {name: 'Name (Z-A)', value: 'dName'},
]
export const settingPages = [
  {name: 'account', title: 'Account', IconName: MdAccountCircle},
  {name: 'advanced', title: 'Advanced', IconName: MdAppSettingsAlt}
];