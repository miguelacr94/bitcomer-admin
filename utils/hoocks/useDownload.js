export const useDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
  //   link.download = data.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
