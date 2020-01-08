export default function ({ store, redirect }) {
    if (!store.state.accessToken) {
        return redirect('/login')
    }
}
