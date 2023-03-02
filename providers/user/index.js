import UserContext from "./context";


export default function Provider({ children }) {
    return (
        <>
            <UserContext>
                {children}
            </UserContext>

        </>
    )
}