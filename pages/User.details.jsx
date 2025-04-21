const { useState, useEffect } = React
const { useSelector } = ReactRedux
import { updatePrefs } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
export function UserDetails() {
    const [userDetails, setUserDetails] = useState(null)
    const user = useSelector(storState => storState.userModule.loggedInUser)


    useEffect(() => {
        if (user) getUserData()
        console.log(userDetails)
    }, [])


    function getUserData() {
        setUserDetails({
            fullname: user.fullname,
            color: user.pref.color,
            bgColor: user.pref.bgColor,
        })
    }


    function onUpdateUserPref(ev) {
        ev.preventDefault()
        const userToUpdate = {
            fullname: userDetails.fullname,
            pref: { color: userDetails.color, bgColor: userDetails.bgColor }
        }
        updatePrefs(userToUpdate)
            .then(() => {
                showSuccessMsg('User updated successfully!')
            })
            .catch(err => {
                console.error('Cannot update user:', err)
                showErrorMsg('Cannot update user')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setUserDetails((prevUser) => ({ ...prevUser, [field]: value }))
    }

    if (!user || !userDetails) return <div>Not logged in</div>

    const { fullname, color, bgColor } = userDetails

    return <section><h1>Your Profile</h1>
        <form onSubmit={onUpdateUserPref}>
            <label>Name</label>
            <input type="text" name="fullname" value={fullname} placeholder="Fullname" onChange={handleChange} />
            <label>Color</label >
            <input type="color" name="color" value={color} onChange={handleChange} />
            <label>BG color</label>
            <input type="color" name="bgColor" value={bgColor} onChange={handleChange} />
            <button>save</button>
        </form>
    </section>
}