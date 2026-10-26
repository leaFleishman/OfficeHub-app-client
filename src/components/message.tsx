
type messageProps = {
    message: string
}

const Message = ({ message }: messageProps) =>
    <div className="notice"><span className="notice-dot" aria-hidden="true"></span><p role="alert">{message}</p></div>

export default Message
