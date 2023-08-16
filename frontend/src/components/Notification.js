const Notification = ({ message, isErrorMessage }) => {
    if (message === null) {
        return null
    }
    if (isErrorMessage) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    return (
        <div className='message'>
            {message}
        </div>
    )
}

export default Notification;