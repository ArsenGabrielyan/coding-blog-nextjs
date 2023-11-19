import { RxDividerVertical } from "react-icons/rx";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw"; import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import DOMPurify from 'isomorphic-dompurify';
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";

const CodeBlock = ({node, inline, className, children, ...props}) => {
     const match = /language-(\w+)/.exec(className || '');
     return !inline && match ? 
     <Prism {...props} style={oneDark} language={match[1]} PreTag='div'>{String(children).replace(/\n$/, '')}</Prism> :
     <code {...props} className={className}>{children}</code>
}
const Heading1 = ({children}) => <h2 className="md-h1">{children}</h2>
const MdEditor = dynamic(
     () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
     { ssr: false }
);

const customComponents = {h1: Heading1,code: CodeBlock,u: 'ins'}
const separator = {
     name: 'separator',
     keyCommand: 'separator',
     button: {className: 'divider', 'aria-label': 'separator'},
     icon: <RxDividerVertical/>
}
const remarkPlugins = [remarkEmoji,remarkGfm], rehypePlugins = [rehypeRaw];

const customToolbar = ['bold','italic','underline','strike',separator,'code','codeBlock',separator,'ulist','olist','todo',separator,'header','image','link','quote'];
const customMode = ['undo','redo','fullscreen','preview'];

export const MarkdownContent = ({children, contentClass})=><ReactMarkdown className={contentClass} components={customComponents} remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>{DOMPurify.sanitize(children)}</ReactMarkdown>;
export const MarkdownInput = ({val, changeVal, id}) => <MdEditor value={val} onChange={changeVal} className="editor" toolbars={customToolbar} toolbarsMode={customMode} previewProps={{rehypePlugins,remarkPlugins}} id={id}/>