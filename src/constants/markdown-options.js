import { RxDividerVertical } from "react-icons/rx";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import DOMPurify from 'isomorphic-dompurify';
export const remarkPlugins = [remarkEmoji,remarkGfm], rehypePlugins = [rehypeRaw]
export const CodeBlock = ({node, inline, className, children, ...props}) => {
     const match = /language-(\w+)/.exec(className || '');
     return !inline && match ? <Prism
     {...props} style={oneDark} language={match[1]} PreTag='div'>
          {String(children).replace(/\n$/, '')}
     </Prism> : <code {...props} className={className}>
          {children}
     </code>
}
const Heading1 = ({children}) => <h2 className="md-h1">{children}</h2>
export const customComponents = {
     h1: Heading1,
     code: CodeBlock,
     u: 'ins'
}
export const separator = {
     name: 'separator',
     keyCommand: 'separator',
     button: {className: 'divider', 'aria-label': 'separator'},
     icon: <RxDividerVertical/>
}
export const customToolbar = ['bold','italic','underline','strike',separator,'code','codeBlock',separator,'ulist','olist','todo',separator,'header','image','link','quote']
export const customMode = ['undo','redo','fullscreen'];
export const MarkdownContent = ({children})=><ReactMarkdown components={customComponents} remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>{DOMPurify.sanitize(children)}</ReactMarkdown>