const ErrorMessage = ({error}) => {
    return (
        <div className="p-2.5 bg-red-50 text-red-700 rounded border border-red-700 my-2.5">{error}</div>
    );
} 

export default ErrorMessage;