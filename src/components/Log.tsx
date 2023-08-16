const Log = ({ logMessages }: { logMessages: string[] }) => {
  return (
    <div className="log">
      {logMessages
        .slice()
        .reverse()
        .map((message, index) => {
            if(index === 0){
                return <p key={index} className="top-message">{message}</p>
            }
          return <p key={index}>{message}</p>;
        })}
    </div>
  );
};

export default Log;
