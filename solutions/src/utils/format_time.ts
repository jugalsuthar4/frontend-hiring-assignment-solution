import moment from "moment";


const formatTime = (time:number) => {
  const givenTime = moment(time);
  const today = moment();
  const tomorrow = moment().add(1, "days");

  if (givenTime.isSame(today, "day")) {
    return "Today";
  } else if (givenTime.isSame(tomorrow, "day")) {
    return "Tomorrow";
  } else {
    return givenTime.format("DD MMMM");
  }
};

export default formatTime;
