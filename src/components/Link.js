import { useTheme } from "styled-components"

const Link = (link, alias) => <a style={{ color: useTheme().anchor }} href={link}>
    <u>{alias}</u>
</a>

export default Link