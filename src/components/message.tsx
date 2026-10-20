
type messageProps = {
    message: string
}

const Message = ({ message }: messageProps) =>
    <div><p role="alert">{message}</p></div>


export default Message