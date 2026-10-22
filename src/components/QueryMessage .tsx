import Message from "./message";


type QueryMessageProps = {
    isPending: boolean;
    isError: boolean;
    loadingMessage: string;
    errorMessage: string;
}

const QueryMessage = ({isError,isPending,loadingMessage,errorMessage}:QueryMessageProps) => {

  if (isPending) {
        return <Message message={loadingMessage} />;
    }

    if (isError) {
        return <Message message={errorMessage} />;
    }

    return null;

}
export default QueryMessage 