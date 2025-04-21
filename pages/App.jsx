const { Routes, Route } = ReactRouterDOM
const { useSelector } = ReactRedux


import { Home } from "../pages/Home.jsx"
import { About } from "../pages/About.jsx"
import { TodoIndex } from "../pages/TodoIndex.jsx"
import { TodoDetails } from "../pages/TodoDetails.jsx"
import { TodoEdit } from "../pages/TodoEdit.jsx"
import { AboutTeam } from "../cmps/AboutTeam.jsx"
import { AboutVision } from "../cmps/AboutVision.jsx"
import { Dashboard } from "../pages/Dashboard.jsx"
import { UserDetails } from "../pages/User.details.jsx"
import {AppHeader} from "../cmps/AppHeader.jsx"

export function App() {

    const user = useSelector(storState => storState.userModule.loggedInUser)
    
    return <section className="app main-layout" style={{ color: user.pref.color, backgroundColor: user.pref.bgColor }}>
        <AppHeader />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}>
                    <Route path="team" element={<AboutTeam />} />
                    <Route path="vision" element={<AboutVision />} />
                </Route>
                <Route path="/todo/:todoId" element={<TodoDetails />} />
                <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                <Route path="/todo/edit" element={<TodoEdit />} />
                <Route path="/todo" element={<TodoIndex />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user/:userId" element={<UserDetails />} />

            </Routes>
        </main>
    </section>
}