import MarkdownIt from 'markdown-it'
import mdKatex from 'markdown-it-katex'
import mdHighlight from 'markdown-it-highlightjs'
import type { ChatMessage } from '../types/types'
import { useClickAnyWhere, useCopyToClipboard } from 'usehooks-ts'

interface Props {
    role: ChatMessage['role']
    message: (() => string) | string
  }

export default function Message({ role, message }: Readonly<Props>) {
    const roleClass = {
        system: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
        user: 'bg-gradient-to-r from-purple-400 to-yellow-400',
        assistant: 'bg-gradient-to-r from-yellow-200 via-green-200 to-green-300',
      }

      const [copiedText, copy] = useCopyToClipboard()

      useClickAnyWhere((e) => {
        const el = e.target as HTMLElement
        let code = null
    
        if (el.matches('div > div.copy-btn')) {
          code = decodeURIComponent(el.dataset.code!)
          copy(code);
          alert(code);
        }
        if (el.matches('div > div.copy-btn > svg')) {
          
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          code = decodeURIComponent(el.parentElement?.dataset.code!)
          copy(code);
          alert(code);
        }
      })

      const htmlString = () => {
        const md = MarkdownIt({
          linkify: true,
          breaks: true,
        }).use(mdKatex).use(mdHighlight)
        const fence = md.renderer.rules.fence!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        md.renderer.rules.fence = (...args: [any, any]) => {
          const [tokens, idx] = args
          const token = tokens[idx]
          const rawCode = fence(...args)
    
        //   return `<div className='relative'>
        //   <div data-code=${encodeURIComponent(token.content)} className="copy-btn gpt-copy-btn group">
        //       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" /></svg>
        //         <div class="group-hover:op-100 gpt-copy-tips">
        //           ${copiedText ? 'Copied' : 'Copy'}
        //         </div>
        //   </div>
        //   ${rawCode}
        //   </div>`
        // }

        return `<div class="relative bg-gray-100 p-4 rounded w-full  overflow-auto">         
        <div data-code=${encodeURIComponent(token.content)} class="copy-btn flex items-center justify-end w-full h-full  b-transparent bg-light-300 dark:bg-dark-300 op-90 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" /></svg>
              <div class="group-hover:op-100 op-0 h-7 bg-black px-2.5 py-1 box-border text-xs text-white rounded absolute z-1 transition duration-600 whitespace-nowrap fc items-center">
                ${copiedText ? 'Copied' : 'Copy'}
              </div>
        </div>
            ${rawCode}
        </div>`
      }

        // return (
        //     <div className="relative">
        //       <div data-code={encodeURIComponent(token.content)} className="copy-btn absolute top-0 right-0 z-3 fcc border b-transparent w-8 h-8 p-2 bg-light-300 dark:bg-dark-300 op-90 cursor-pointer group" onClick={() => copy(token.content)}>
        //         <CopyIcon/>
        //         <div className="group-hover:op-100 op-0 h-7 bg-black px-2.5 py-1 box-border text-xs c-white fcc rounded absolute z-1 transition duration-600 whitespace-nowrap -top-8">
        //           {copiedText ? 'Copied' : 'Copy'}
        //         </div>
        //       </div>
        //       <div dangerouslySetInnerHTML={{ __html: rawCode }} />
        //     </div>
        //   );
        // };

        if (typeof message === 'function')
            return md.render(message())
          else if (typeof message === 'string')
            return md.render(message)
      
          return ''
        }

    return (
        <div className="py-2 -mx-4 px-4 transition-colors md:hover:bg-slate/3">
      <div className={`flex gap-0.5 rounded-lg ${role === 'user' ? 'op-75' : ''}`}>
        <div className={`shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${roleClass[role as keyof typeof roleClass]}`} />
        <div className="message p-4 prose break-words overflow-hidden w-full" dangerouslySetInnerHTML={{ __html: htmlString() }} />
      </div>
      </div>      
    );
}