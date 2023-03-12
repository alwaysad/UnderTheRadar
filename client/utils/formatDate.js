function getFormatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const timeDiffInMs = now.getTime() - date.getTime();
  const timeDiffInMinutes = Math.round(timeDiffInMs / (1000 * 60));
  const timeDiffInHours = Math.round(timeDiffInMs / (1000 * 60 * 60));
  const timeDiffInDays = Math.round(timeDiffInMs / (1000 * 60 * 60 * 24));

  let formattedString = "";

  if (timeDiffInDays >= 1) {
    formattedString += `${timeDiffInDays} day${timeDiffInDays > 1 ? "s" : ""} `;
  } else if (timeDiffInHours >= 1) {
    formattedString += `${timeDiffInHours} hour${
      timeDiffInHours > 1 ? "s" : ""
    } `;
  } else if (timeDiffInMinutes > 0) {
    formattedString += `${timeDiffInMinutes} minute${
      timeDiffInMinutes > 1 ? "s" : ""
    } `;
  } else {
    formattedString = "just now";
  }
  return formattedString;
}

export default getFormatDate;
