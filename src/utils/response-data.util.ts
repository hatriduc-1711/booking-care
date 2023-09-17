const responseData = (result: boolean, message: string, data?: any) => {
  if (!result || data === undefined) {
    return {
      result: result,
      message: message,
    };
  }

  return {
    result: result,
    message: message,
    data: data,
  };
};

export default responseData;
