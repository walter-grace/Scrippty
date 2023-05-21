import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Text variant="h1">Scene Doc</Text>
        <Text className="text-zinc-600">
          Craft cinematic gold with Scene Doc - your go-to hub for screenwriting finesse.
          Inject life into your scenes, let them leap off the page, and even concoct the perfect shot list and shot types. 
        </Text>
      </section>

      <section className="flex flex-col gap-3">
        <Text variant="h2" className="italic">Unleash the Spielberg in You with <i>Scripty</i></Text>
        <div className="lg:w-2/3">
        <Text className="text-center">
          Start by pasting in your scene &#8594;
        </Text>
          <Chat />
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
