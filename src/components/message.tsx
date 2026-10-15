
type messageProps = {
    message: string
}

const Message = ({ message }: messageProps) =>
    <div><p>{message}</p></div>


export default Message