import Link from "../Link"

const Rules = () => {
  const wiki_rules = Link('https://en.wikipedia.org/wiki/Nonogram#Example', 'wikipedia')

  return <div>
    <p>Rules on {wiki_rules}</p>
    <p style={{marginTop:'8px'}}>For now there is just that link to wiki :/</p>
  </div>
}

const RulesWindow = () => ({
  title: 'Puzzle rules',
  content: <Rules />,
  config: {
    closable: true
  },
  menu: []
})

export default RulesWindow