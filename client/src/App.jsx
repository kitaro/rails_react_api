import './App.css'
import PostsList from "./features/posts/PostsList"

function App() {
  return (
    <>
        <div className="app">
            <h1>React ile Rails Blog</h1>
            <p>Bu uygulama düzenini client/src/App.jsx</p>
            <PostsList />
        </div>
    </>
  )
}

export default App
