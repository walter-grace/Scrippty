import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import useOnScreen from '../components/useOnScreen'

function Home() {
  const controls = useAnimation();
  const ref = useRef();

  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) {
      controls.start("visible");
    }
  }, [onScreen, controls]);

  return (
    <Page className="flex flex-col gap-12">
      <motion.section 
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Text variant="h1">Scene Doc</Text>
        <Text className="text-zinc-600">
          Craft cinematic gold with Scene Doc - your go-to hub for screenwriting finesse.
          Inject life into your scenes, let them leap off the page, and even concoct the perfect shot list and shot types. 
        </Text>
      </motion.section>

      <section className="flex flex-col gap-3">
        <motion.div
          className="italic"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 1.5 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
        >
          <Text variant="h2">Unleash the Spielberg in You with <i>Scripty</i></Text>
        </motion.div>
        <div className="lg:w-2/3">
          <motion.div 
            ref={ref}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 2 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
          >
            <Text>
            Start by pasting in your scene in below &#8595;
            </Text>
          </motion.div>
          <Chat />
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
