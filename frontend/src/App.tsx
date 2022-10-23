import Container from "./components/atom/Container"
import ThemedButton from "./components/moleculs/Button"
import ComponentsCheck from "./pages/ComponentsCheck"


function App() {

  return (
    <Container maxWidth={"md"}>
      <ComponentsCheck />
    </Container>
  )
}

export default App
