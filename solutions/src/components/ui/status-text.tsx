type StatusTextProps = {
  booked: boolean;
  overlapped: boolean;
};

const StatusText = ({ booked, overlapped }: StatusTextProps) => {
  if (booked || overlapped)
    return (
      <p className={booked ? "text-booked" : "text-overlapped"}>
        {booked ? "Booked" : "Overlapped"}
      </p>
    );
  return <></>;
};

export default StatusText;
