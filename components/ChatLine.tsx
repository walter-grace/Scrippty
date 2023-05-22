import clsx from 'clsx';
import Balancer from 'react-wrap-balancer';
import { useEffect, useState } from 'react';

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
  delay?: number // Delay prop to control the delay before the message appears
}

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ role = 'assistant', content, delay = 0 }: ChatGPTMessage) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000); // convert delay from seconds to milliseconds
    return () => clearTimeout(timer);
  }, [delay]);

  if (!content) {
    return null;
  }

  const formattedMessage = convertNewLines(content);

  return (
    <div
      className={
        role !== 'assistant' ? 'float-right clear-both' : 'float-left clear-both'
      }
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${delay}s linear`
      }}
    >
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900 text-center">
                <a href="#" className="hover:underline italic">
                  {role === 'assistant' ? 'Scripty' : 'You'}
                </a>
              </p>
              <p className={clsx('text ', role === 'assistant' ? 'font-semibold' : 'text-gray-400')}>
                {formattedMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  )
}
