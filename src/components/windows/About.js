import Link from "../Link"

const About = () => {
  const source_link = Link('https://github.com/Sebekerga/nonograms95', 'github.com/Sebekerga/nonograms95')
  const me_link_hehe = Link('https://github.com/Sebekerga', 'Maxim Kozlov')
  const wiki_page = Link('https://en.wikipedia.org/wiki/Nonogram', 'Wikipedia')

  return <div>
    <p>Nonograms by {me_link_hehe}</p>
    <p>Source code: {source_link}</p>
    <p style={{marginTop:'8px'}}>More on {wiki_page}</p>
  </div>
}

const AboutWindow = (window_id) => ({
  title: 'About this app',
  content: <About />,
  config: {
    closable: true
  },
  menu: []
})

export default AboutWindow